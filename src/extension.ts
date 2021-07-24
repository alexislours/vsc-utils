import * as vscode from "vscode";
import { modules } from "./modules/main";

export function activate(context: vscode.ExtensionContext): void {
    console.log('Extension "vsc-utils" is now active!');

    modules.forEach((module) => module.activate(context));
}
