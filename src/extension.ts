'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export async function createNewPost() {
    const result = await vscode.window.showInputBox({
        value: 'Post Name',
        placeHolder: 'For example: holiday-gift-guide',
    });
    
    const wsedit = new vscode.WorkspaceEdit();
    let wsFolder = vscode.workspace.workspaceFolders![0];
    if (wsFolder !== undefined) {
        const wsPath = wsFolder.uri.fsPath; // gets the path of the first workspace folder
        const filePath = vscode.Uri.file(wsPath + `/${result}/${result}.md`);
        const outlinePath = vscode.Uri.file(wsPath + `/${result}/outline.md`);
        wsedit.createFile(filePath, { ignoreIfExists: true });
        wsedit.createFile(outlinePath, { ignoreIfExists: true});
        vscode.workspace.applyEdit(wsedit);
        vscode.window.showInformationMessage(`${result} Post has been created!`);
    } else {
        vscode.window.showErrorMessage("This command can only be done within a workspace!");
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "author-tools" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let sayHello = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    let createPost = vscode.commands.registerCommand('extension.createPost', createNewPost);

    context.subscriptions.push(sayHello);
    context.subscriptions.push(createPost);
}

// this method is called when your extension is deactivated
export function deactivate() {
}