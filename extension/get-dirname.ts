import { fileURLToPath } from 'node:url'
import path from 'path'

export let getDirname = (importMetaUrl: string): string =>
  path.dirname(fileURLToPath(importMetaUrl))
