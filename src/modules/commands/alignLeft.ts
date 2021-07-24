import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
    const alignLeft = vscode.commands.registerCommand("vsc-utils.alignLeft", () => {
        const editor = vscode?.window?.activeTextEditor;
        if (editor !== undefined) {
            const cursorStart = editor.selection.start;
            const cursorEnd = editor.selection.end;
            const range = new vscode.Range(cursorStart, cursorEnd);
            const rangeText = editor.document.getText(range);
            const clearedSelection = rangeText.match(/(.+)/)?.[0];
            if (clearedSelection) {
                const whiteSpace = clearedSelection.match(/^[ \t]+/)?.[0];
                if (whiteSpace) {
                    const codeLines = rangeText.split("\n");
                    for (let i = 0; i < codeLines.length; i++) {
                        codeLines[i] = codeLines[i].replace(whiteSpace, "");
                    }
                    editor.edit((editBuilder) => {
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
