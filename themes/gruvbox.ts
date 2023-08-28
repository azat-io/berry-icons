export let gruvbox: ColorTheme = {
  colors: {
    light: [
      // white
      '#fbf1c7',
      // red
      '#cc241d',
      '#9d0006',
      // green
      '#98971a',
      '#79740e',
      // yellow
      '#d79921',
      '#b57614',
      // blue
      '#458588',
      '#076678',
      // purple
      '#b16286',
      '#8f3f71',
      // aqua
      '#689d6a',
      '#427b58',
      // gray
      '#7c6f64',
      // black
      '#282828',
      // orange
      '#d65d0e',
      '#af3a03',
    ],
    dark: [
      // black
      '#282828',
      // red
      '#cc241d',
      '#fb4934',
      // green
      '#98971a',
      '#b8bb26',
      // yellow
      '#d79921',
      '#fabd2f',
      // blue
      '#458588',
      '#83a598',
      // purple
      '#b16286',
      '#d3869b',
      // aqua
      '#689d6a',
      '#8ec07c',
      // gray
      '#a89984',
      // white
      '#ebdbb2',
      // orange
      '#d65d0e',
      '#fe8019',
    ],
  },
  overrides: {
    eslint: {
      '#4b32c3': '#458588',
      '#8080f2': '#458588',
    },
    javascript: {
      '#f0db4f': '#fabd2f',
    },
    nodejs: {
      '#6cc24a': '#98971a',
    },
    svg: {
      '#ffb338': '#fe8019',
    },
  },
  previewBackground: '#1d2021',
  previewColor: '#ebdbb2',
  previewTheme: 'dark',
  name: 'Gruvbox',
  id: 'gruvbox',
}
