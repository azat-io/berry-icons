import { gruvboxOverrides } from './overrides/gruvbox'
import { vitesseColors } from './colors/vitesse'
import { draculaColors } from './colors/dracula'
import { gruvboxColors } from './colors/gruvbox'
import { githubColors } from './colors/github'

export let colorThemes: {
  [key: string]: ColorTheme
} = {
  gruvbox: {
    overrides: gruvboxOverrides,
    colors: gruvboxColors,
  },
  vitesse: {
    colors: vitesseColors,
  },
  dracula: {
    colors: draculaColors,
  },
  github: {
    colors: githubColors,
  },
}
