export let filesIcons: FileIcon[] = [
  {
    extensions: ['css'],
    name: 'CSS',
  },
  {
    files: [
      '.eslintrc.js',
      '.eslintrc.cjs',
      '.eslintrc.yaml',
      '.eslintrc.json',
      '.eslintrc-md.js',
      '.eslintrc-jsdoc.js',
      '.eslintrc',
      '.eslintignore',
      '.eslintcache',
      '.eslint.config.js',
      'eslint.config.js',
    ],
    name: 'ESLint',
  },
  {
    files: [
      '.gitignore',
      '.git-blame-ignore',
      '.gitignore-global',
      '.gitignore_global',
      '.gitconfig',
      '.gitattributes',
      '.gitmodules',
      '.gitkeep',
      '.gitinclude',
      'git-history',
    ],
    name: 'Git',
  },
  {
    extensions: ['htm', 'html'],
    name: 'HTML',
  },
  {
    extensions: ['js', 'cjs', 'mjs', 'es'],
    name: 'JavaScript',
  },
  {
    extensions: ['md'],
    name: 'Markdown',
  },
  {
    files: [
      'package.json',
      'package-lock.json',
      '.nvmrc',
      '.esmrc',
      '.node-version',
    ],
    name: 'NodeJS',
  },
  {
    files: ['pnpm-lock.yaml', 'pnpm-workspace.yaml', '.pnpmfile.cjs'],
    name: 'pnpm',
    light: true,
  },
  {
    extensions: ['svg'],
    name: 'SVG',
  },
  {
    extensions: ['ts', 'cts', 'mts'],
    name: 'TypeScript',
  },
  {
    extensions: ['d.ts', 'd.cts', 'd.mts'],
    name: 'TypeScript Defs',
  },
  {
    files: [
      'vite.config.js',
      'vite.config.mjs',
      'vite.config.cjs',
      'vite.config.ts',
      'vite.config.cts',
      'vite.config.mts',
    ],
    name: 'Vite',
    light: true,
  },
]
