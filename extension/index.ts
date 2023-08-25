import * as vscode from 'vscode'

import { build } from './build'

export let activate = async () => {
  vscode.workspace.onDidChangeConfiguration(build)

  await build()
}

export let deactivate = () => {}
