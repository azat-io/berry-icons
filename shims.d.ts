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

  type Theme = 'light' | 'dark'

  interface ColorTheme {
    overrides?: {
      [key: string]: {
        [key: string]: string
      }
    }
    colors:
      | {
          [key in Theme]: string[]
        }
      | string[]
    previewBackground: string
    previewColor: string
    previewTheme: Theme
    name: string
    id: string
  }

  type IconType = 'folders' | 'files' | 'base'
}
