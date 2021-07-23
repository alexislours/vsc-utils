import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let alignLeft = vscode.commands.registerCommand('vsc-utils.alignLeft', () => {
        const editor = vscode?.window?.activeTextEditor;
        if (editor !== undefined) {
            let cursorStart = editor.selection.start;
            let cursorEnd = editor.selection.end;
            let range = new vscode.Range(cursorStart, cursorEnd);
            let rangeText = editor.document.getText(range);
            let clearedSelection = rangeText.match(/(.+)/)?.[0];
            if (clearedSelection) {
                let whiteSpace = clearedSelection.match(/^[ \t]+/)?.[0];
                if (whiteSpace) {
                    let codeLines = rangeText.split("\n");
                    for (let i = 0; i < codeLines.length; i++) {
                        codeLines[i] = codeLines[i].replace(whiteSpace, "");
                    }
                    editor.edit(editBuilder => {
                        editBuilder.replace(range, codeLines.join("\n"));
                    });
                } else {
                    vscode.window.showErrorMessage("No whitespace in text selected.");
                }
            } else {
                vscode.window.showErrorMessage("No text selected.");
            }
        } else {
            vscode.window.showErrorMessage("No active editor.");
        }
    });

    context.subscriptions.push(alignLeft);
}