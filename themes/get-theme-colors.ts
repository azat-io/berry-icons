import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import https from 'https'
import path from 'path'

let themes = [
  {
    url: 'https://github.com/dracula/visual-studio-code/blob/764c3b59aaff75c43399adb9814e143edb494be4/src/dracula.yml',
    name: 'dracula',
  },
  {
    url: 'https://github.com/primer/github-vscode-theme/blob/main/src/classic/colors.json',
    name: 'github',
  },
  {
    url: 'https://github.com/jdinhify/vscode-theme-gruvbox/blob/main/themes/gruvbox-dark-hard.json',
    name: 'gruvbox',
  },
  {
    url: 'https://github.com/antfu/vscode-theme-vitesse/blob/main/src/colors.ts',
    name: 'vitesse',
  },
]

let dirname = path.dirname(fileURLToPath(import.meta.url))

export let get = async (
  url: string,
  encoding: BufferEncoding = 'utf-8',
): Promise<string> =>
  new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let { statusCode } = res

        if (statusCode !== 200) {
          reject(new Error('Request failed'))
        }

        res.setEncoding(encoding)

        if (encoding === 'utf-8') {
          let rawData = ''
          res.on('data', chunk => (rawData += chunk))

          res.on('end', () => {
            resolve(rawData)
          })
        } else if (encoding === 'binary') {
          let data: Uint8Array[] = []
          res.on('data', chunk => data.push(Buffer.from(chunk, 'binary')))

          res.on('end', () => {
            resolve(Buffer.concat(data).toString())
          })

          res.on('error', () => {
            reject(new Error('Get failed'))
          })
        }
      })
      .on('error', () => {
        reject(new Error('Get failed'))
      })
  })

let convertGHURLToDownloadURL = (ghURL: string): string => {
  let oldPath = new URL(ghURL).pathname
  return 'https://raw.githubusercontent.com' + oldPath.replace('/blob/', '/')
}

await Promise.all(
  themes.map(async theme => {
    let targetUrl = convertGHURLToDownloadURL(theme.url)
    let content = await get(targetUrl)
    let colors = new Set()

    let matches = [...content.matchAll(/#([\da-f]{6}|[\da-f]{3})/gi)]

    for (let match of matches) {
      colors.add(match.at(0))
    }

    await fs.writeFile(
      path.join(dirname, 'colors', `${theme.name}.ts`),
      `export let ${theme.name}Colors: ColorTheme['colors'] = ${JSON.stringify([
        ...colors,
      ])}`,
    )
  }),
)
