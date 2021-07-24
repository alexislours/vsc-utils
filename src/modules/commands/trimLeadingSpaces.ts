import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
    const trimLeadingSpaces = vscode.commands.registerCommand("vsc-utils.trimLeadingSpaces", () => {
        const editor = vscode?.window?.activeTextEditor;
        if (editor !== undefined) {
            const cursorStart = editor.selection.start;
            const cursorEnd = editor.selection.end;
            const range = new vscode.Range(cursorStart, cursorEnd);
            const rangeText = editor.document.getText(range);
            if (rangeText) {
                const clearedSelection = rangeText.replace(/^[ \t]+/gm, "");
                editor.edit((editBuilder) => {
                    editBuilder.replace(range, clearedSelection);
                });
            } else {
                vscode.window.showErrorMessage("No text selected.");
            }
        } else {
            vscode.window.showErrorMessage("No active editor.");
        }
    });

    context.subscriptions.push(trimLeadingSpaces);
}
