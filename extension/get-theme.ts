import { getColorTheme } from './get-color-theme'

export let getTheme = (): undefined | Theme => {
  let colorTheme = getColorTheme().toLowerCase()

  if (colorTheme.includes('dark')) {
    return 'dark'
  } else if (colorTheme.includes('light')) {
    return 'light'
  }

  return undefined
}
