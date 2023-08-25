import * as vscode from 'vscode'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

import { getColorTheme } from './get-color-theme'
import { generateIcons } from './generate-icons'
import { getTheme } from './get-theme'

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

let defineIconSchema = (): IconSchema => ({
  folderNamesExpanded: {},
  fileExtensions: {},
  folderNames: {},
  fileNames: {},
})

export let build = async (): Promise<void> => {
  let tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'berry-icons'))
  let destDir = path.join(__dirname, '/../dist')
  let iconsDir = path.join(destDir, './icons')

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
    id,
  }: FileIcon & { theme: Theme }): void => {
    let data = themedData[theme]

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

  let iconDefinitions = await generateIcons(
    {
      colorTheme: getColorTheme(),
      destDir: './icons',
      theme: getTheme(),
      tmpDir,
    },
    updateThemedData,
  )

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

  await fs.writeFile(path.join(destDir, 'index.json'), JSON.stringify(schema))
}
