import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import path from 'path'

import { generateIcons } from '../extension/generate-icons'
import { gruvbox } from '../themes/gruvbox'
import { filesIcons } from '../data/files'

let getDirname = (importMetaUrl: string): string =>
  path.dirname(fileURLToPath(importMetaUrl))

let __dirname = getDirname(import.meta.url)

let createScreenshot = async (colorTheme: ColorTheme): Promise<void> => {
  try {
    let tmpDir = path.join(__dirname, '..', 'temp')

    await fs.mkdir(tmpDir, { recursive: true })

    let iconDefinitions = await generateIcons({
      colorTheme: colorTheme.id,
      destDir: tmpDir,
      tmpDir,
    })

    let icons = await Object.entries(iconDefinitions).reduce(
      async (accumulator, [name, { iconPath }]) => ({
        ...(await accumulator),
        [name]: (await fs.readFile(iconPath)).toString('base64'),
      }),
      Promise.resolve({}) as Promise<Record<string, string>>,
    )

    let browser = await puppeteer.launch({
      headless: 'new',
    })

    let page = await browser.newPage()
    let numOfItemsPerLine = 12
    let itemSize = 64
    let paddingSize = 16
    let gapSize = 16

    await page.setViewport({
      width:
        paddingSize * 2 +
        itemSize * numOfItemsPerLine +
        gapSize * (numOfItemsPerLine - 1),
      deviceScaleFactor: 3,
      height: 10,
    })

    // prettier-ignore
    let html = [
      '<style>',
        'html,',
        'body {',
          'margin: 0;',
          'font-family: Helvetica, sans-serif;',
          'font-size: 12px;',
          `background: ${colorTheme.previewBackground};`,
          `color: ${colorTheme.previewColor};`,
        '}',
        '.container {',
          'display: grid;',
          `grid-template-columns: repeat(auto-fill, ${itemSize}px);`,
          `gap: ${gapSize}px;`,
          `padding: ${paddingSize}px;`,
        '}',
        '.item {',
          'display: flex;',
          'flex-direction: column;',
          'align-items: center;',
        '}',
        '.name {',
          'text-align: center;',
        '}',
      '</style>',
      '<div class="container">',
        filesIcons
          .reduce((accumulator: string[], { name, id }) => [
            ...accumulator,
            '<div class="item">',
              '<img src="data:image/svg+xml;base64,',
                icons[id],
                '"',
              '/>',
              '<p class="name">',
                name,
              '</p>',
            '</div>',
          ], []).join('\n'),
      '</div>',
    ].join('\n')

    await page.setContent(html, {
      waitUntil: 'networkidle0',
    })

    await page.screenshot({
      path: `assets/${colorTheme.id}.webp`,
      omitBackground: true,
      fullPage: true,
      type: 'webp',
    })

    await browser.close()
    await fs.rmdir(tmpDir, { recursive: true })
  } catch (error) {
    console.error('error', error)
  }
}

Promise.all([gruvbox].map(colorTheme => createScreenshot(colorTheme)))
