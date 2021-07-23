import * as vscode from 'vscode';
import { modules } from './modules/main';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "vsc-utils" is now active!');
	
	modules.forEach(module => module.activate(context));
}

export function deactivate() { }
