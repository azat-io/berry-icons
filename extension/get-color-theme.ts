import * as vscode from 'vscode'

export let getColorTheme = (): string =>
  vscode.workspace
    .getConfiguration('')
    .get<string>('workbench.colorTheme')
    ?.toLowerCase() ?? 'default'
