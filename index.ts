import * as vscode from 'vscode'

import { build } from './extension/build'

export let activate = async () => {
  vscode.workspace.onDidChangeConfiguration(build)
  await build()
}

export let deactivate = () => {}
