import type { RGBColor } from 'color-diff'

import colorConvert from 'color-convert'
import { closest } from 'color-diff'

import { colorThemes } from '../themes/index'

type Keyword =
  | 'fuchsia'
  | 'purple'
  | 'maroon'
  | 'yellow'
  | 'silver'
  | 'white'
  | 'olive'
  | 'green'
  | 'black'
  | 'aqua'
  | 'teal'
  | 'blue'
  | 'navy'
  | 'gray'
  | 'red'

let isHex = (color: string) => /#([\da-f]{6}|[\da-f]{3})/i.test(color)

let hexToRGB = (hex: string): RGBColor => {
  let [R, G, B] = colorConvert.hex.rgb(hex)
  return { R, G, B }
}

let keywordToRGB = (keyword: Keyword): RGBColor => {
  let [R, G, B] = colorConvert.keyword.rgb(keyword)
  return { R, G, B }
}

let rgbToHex = (R: number, G: number, B: number): string =>
  `#${colorConvert.rgb.hex(R, G, B)}`

let formatColor = (color: string) => {
  if (isHex(color)) {
    return hexToRGB(color)
  }

  return keywordToRGB(color as Keyword)
}

let findNearestColor = (colorList: string[], color: string): string => {
  if (!colorList.length) {
    return color
  }

  let { R, G, B } = closest(
    formatColor(color),
    colorList.map(currentColor => formatColor(currentColor)),
  )

  return rgbToHex(R, G, B)
}

export let colorize = (
  colorTheme: string,
  id: string,
  source: string,
): string => {
  let pattern =
    /#([\da-f]{6}|[\da-f]{3})|black|green|silver|gray|olive|white|yellow|maroon|navy|red|blue|purple|teal|fuchsia|aqua/gi

  let theme: ColorTheme

  if (colorTheme.startsWith('dracula')) {
    theme = colorThemes.dracula
  } else if (colorTheme.startsWith('github')) {
    theme = colorThemes.github
  } else if (colorTheme.startsWith('gruvbox')) {
    theme = colorThemes.gruvbox
  } else if (colorTheme.startsWith('vitesse')) {
    theme = colorThemes.vitesse
  } else {
    return source
  }

  let { overrides, colors } = theme

  return source.replaceAll(
    pattern,
    matched =>
      overrides?.[id]?.[matched.toLowerCase()] ??
      findNearestColor(colors, matched),
  )
}
