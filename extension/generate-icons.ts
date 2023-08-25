import fs from 'fs/promises'
import crypto from 'crypto'
import path from 'path'

import { getDirname } from './get-dirname'
import { filesIcons } from '../data/files'
import { baseIcons } from '../data/base'
import { colorize } from './colorize'

interface BuildOptions extends BaseIcon {
  type: IconType
  theme: Theme
}

interface IconDefinitions {
  [key: string]: {
    iconPath: string
  }
}

let dirname = getDirname(import.meta.url)

export let generateIcons = async (
  {
    colorTheme,
    destDir,
    tmpDir,
  }: {
    colorTheme: string
    destDir: string
    tmpDir: string
  },
  callback?: (buildOptions: BuildOptions) => void,
): Promise<IconDefinitions> => {
  let iconDefinitions: IconDefinitions = {}

  let buildIcon = async (config: BuildOptions): Promise<void> => {
    let id = crypto.randomBytes(8).toString('hex')
    let fileName = `${config.id}-${id}.svg`

    iconDefinitions[config.id] = {
      iconPath: path.join(destDir, fileName),
    }

    let source = (
      await fs.readFile(
        path.join(dirname, '/../icons', config.type, `${config.id}.svg`),
      )
    ).toString()

    await fs.writeFile(
      path.join(tmpDir, fileName),
      colorize(colorTheme, config.id, source),
    )

    if (callback) {
      callback(config)
    }
  }

  let formatIconsValues = (
    icons: (BaseIcon | FileIcon)[],
    type: IconType,
  ): BuildOptions[] =>
    icons.reduce(
      (accumulator: BuildOptions[], { light, name, id, ...props }) => [
        ...accumulator,
        {
          theme: 'dark',
          type,
          name,
          id,
          ...props,
        },
        ...(light
          ? [
              {
                theme: 'light' as Theme,
                id: `${id}-light`,
                name,
                type,
                ...props,
              },
            ]
          : []),
      ],
      [],
    )

  await Promise.all([
    ...formatIconsValues(baseIcons, 'base').map(value => buildIcon(value)),
    ...formatIconsValues(filesIcons, 'files').map(value => buildIcon(value)),
  ])

  return iconDefinitions
}
