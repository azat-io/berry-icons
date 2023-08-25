import * as vscode from 'vscode'
import fs from 'fs/promises'
import crypto from 'crypto'
import path from 'path'
import os from 'os'

import { filesIcons } from '../data/files'
import { baseIcons } from '../data/base'
import { colorize } from './colorize'

interface IconDefinitions {
  [key: string]: {
    iconPath: string
  }
}

interface IconSchema {
  folderNamesExpanded: {
    [key: string]: string
  }
  fileExtensions: {
    [key: string]: string
  }
  folderNames: {
    [key: string]: string
  }
  fileNames: {
    [key: string]: string
  }
}

interface BuildOptions extends BaseIcon {
  type: IconType
  theme: Theme
}

let defineIconSchema = (): IconSchema => ({
  folderNamesExpanded: {},
  fileExtensions: {},
  folderNames: {},
  fileNames: {},
})

let toKebabCase = (str: string): string =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g)!
    .map(x => x.toLowerCase())
    .join('-')

export let build = async (): Promise<void> => {
  let tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'berry-icons'))
  let distDir = path.join(__dirname, '/../dist')
  let iconsDir = path.join(distDir, 'icons')

  let iconDefinitions: IconDefinitions = {}

  let themedData: {
    light: IconSchema
    dark: IconSchema
  } = {
    light: defineIconSchema(),
    dark: defineIconSchema(),
  }

  let updateThemedData = ({
    extensions,
    files,
    theme,
    name,
  }: FileIcon & { theme: Theme }): void => {
    let data = themedData[theme]
    let id = toKebabCase(name)

    if (extensions) {
      extensions.forEach(extension => {
        data.fileExtensions[extension] = id
      })
    }

    if (files) {
      files.forEach(file => {
        data.fileNames[file] = id
      })
    }
  }

  let buildIcon = async (config: BuildOptions): Promise<void> => {
    let iconName = toKebabCase(config.name)
    let id = crypto.randomBytes(8).toString('hex')
    let fileName = `${iconName}-${id}.svg`

    iconDefinitions[iconName] = {
      iconPath: path.join('icons', fileName),
    }

    let source = (
      await fs.readFile(
        path.join(__dirname, '/../icons', config.type, `${iconName}.svg`),
      )
    ).toString()

    await fs.writeFile(path.join(tmpDir, fileName), colorize(iconName, source))
    updateThemedData(config)
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
    formatIconsValues(baseIcons, 'base').map(value => buildIcon(value)),
    formatIconsValues(filesIcons, 'files').map(value => buildIcon(value)),
  ])

  let hidesExplorerArrows =
    vscode.workspace
      .getConfiguration('berryIcons')
      .get<boolean>('hideExplorerArrows') ?? true

  let schema = {
    iconDefinitions,
    ...themedData.dark,
    light: {
      file: 'file-light',
      ...themedData.light,
    },
    folderExpanded: 'folder-open',
    hidesExplorerArrows,
    folder: 'folder',
    file: 'file',
  }

  await fs.rm(iconsDir, { recursive: true, force: true })
  await fs.mkdir(iconsDir, { recursive: true })
  await fs.cp(tmpDir, iconsDir, { recursive: true })
  await fs.rm(tmpDir, { recursive: true })

  await fs.writeFile(path.join(distDir, 'index.json'), JSON.stringify(schema))
}
