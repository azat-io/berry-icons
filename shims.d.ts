export {}

declare global {
  interface BaseIcon {
    light?: boolean
    name: string
    id: string
  }

  interface FileIcon extends BaseIcon {
    extensions?: string[]
    files?: string[]
  }

  interface ColorTheme {
    overrides?: {
      [key: string]: {
        [key: string]: string
      }
    }
    colors: string[]
  }

  type Theme = 'light' | 'dark'

  type IconType = 'folders' | 'files' | 'base'
}
