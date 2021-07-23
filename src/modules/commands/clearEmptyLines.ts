import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let clearEmptyLines = vscode.commands.registerCommand('vsc-utils.clearEmptyLines', () => {
        const editor = vscode?.window?.activeTextEditor;
        if (editor !== undefined) {
            let cursorStart = editor.selection.start;
            let cursorEnd = editor.selection.end;
            let range = new vscode.Range(cursorStart, cursorEnd);
            let rangeText = editor.document.getText(range);
            if (rangeText) {
                let clearedSelection = rangeText.replace(/^\s*\n/gm, "");
                editor.edit(editBuilder => {
                    editBuilder.replace(range, clearedSelection);
                });
            } else {
                vscode.window.showErrorMessage("No text selected.");
            }
        } else {
            vscode.window.showErrorMessage("No active editor.");
        }
    });

    context.subscriptions.push(clearEmptyLines);
}