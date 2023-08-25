import * as vscode from 'vscode'

export let getColorTheme = (): string =>
  vscode.workspace
    .getConfiguration('workbench')
    .get<string>('colorTheme')
    ?.toLowerCase() ?? 'default'
