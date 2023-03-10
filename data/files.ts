import type { FileIcon } from '../typings/icon.d.js'

export let filesIcons: FileIcon[] = [
  {
    id: 'css',
    name: 'CSS',
    extensions: ['css'],
  },
  {
    id: 'html',
    name: 'HTML',
    extensions: ['htm', 'html'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    extensions: ['js', 'cjs', 'mjs', 'es'],
  },
  {
    id: 'react',
    name: 'React',
    extensions: ['jsx', 'tsx'],
    light: true,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    extensions: ['ts', 'cts', 'mts'],
  },
]
