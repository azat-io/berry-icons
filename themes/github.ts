export let github: ColorTheme = {
  colors: {
    dark: [
      // red
      '#ff7b72',
      '#f85149',
      // green
      '#7ee787',
      '#aff5b4',
      // yellow
      '#f2cc60',
      // blue
      '#a5d6ff',
      '#1f6feb',
      '#a5d6ff',
      // orange
      '#ffa657',
      // purple
      '#d2a8ff',
      // white
      '#e6edf3',
      // black
      '#0e1117',
    ],
    light: [
      // red
      '#cf222e',
      // green
      '#116329',
      // yellow
      '#f2cc60',
      // blue
      '#0a3069',
      '#0550ae',
      // orange
      '#ffa657',
      //purple
      '#6639ba',
      '#8250df',
      // white
      '#fff',
      // black
      '#1f2328',
    ],
  },
  overrides: {
    storybook: {
      '#ff4785': '#e85aad',
    },
    nodejs: {
      '#6cc24a': '#116329',
    },
  },
  previewBackground: '#fff',
  previewColor: '#1b1f23',
  previewTheme: 'light',
  name: 'GitHub',
  id: 'github',
}
