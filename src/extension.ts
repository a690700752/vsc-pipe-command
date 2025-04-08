// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { exec } from "node:child_process";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let history = context.globalState.get<string[]>("history", []);

  const addHistory = (command: string) => {
    const newHistory = [command, ...history.filter((h) => h !== command)].slice(
      0,
      10
    );
    context.globalState.update("history", newHistory);
    history = newHistory;
  };

  const disposable = vscode.commands.registerCommand(
    "pipe-command.pipe",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor");
        return;
      }

      const quickPick = vscode.window.createQuickPick();
      quickPick.placeholder = "Select External Command";
      const items = history.map((h) => ({ label: h, alwaysShow: true }));
      quickPick.items = items;
      if (items.length > 0) {
        quickPick.activeItems = [items[0]];
      }

      quickPick.onDidChangeValue((value) => {
        const existingItem = items.find((i) => i.label === value);
        if (!value) {
          quickPick.items = items;
          // quickPick.selectedItems = [];
        } else if (existingItem) {
          quickPick.items = items;
          // quickPick.selectedItems = [existingItem];
        } else {
          const inputItem = { label: value, alwaysShow: true };
          quickPick.items = [inputItem, ...items];
          // quickPick.activeItems = [inputItem];
        }
      });

      quickPick.onDidAccept(() => {
        quickPick.dispose();
        const userCommand = quickPick.selectedItems[0]?.label;
        if (!userCommand) {
          return;
        }

        addHistory(userCommand);
        console.log("selections", editor.selections);
        Promise.all(
          editor.selections.map((selection) => {
            const selectedText = editor.document.getText(selection);
            console.log("selectedText", selectedText);

            const cwd = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
            return executeCommand({
              userCommand,
              selectedText,
              cwd,
            });
          })
        )
          .then((list) => {
            editor.edit((editBuilder) => {
              list.forEach((stdout, index) => {
                const selection = editor.selections[index];
                editBuilder.replace(selection, stdout.trim());
              });
            });
          })
          .catch((error) => {
            vscode.window.showErrorMessage(`Error: ${error}`);
          });
      });
      quickPick.show();
      quickPick.enabled = true;
    }
  );

  context.subscriptions.push(disposable);
}

async function executeCommand(args: {
  userCommand: string;
  selectedText: string | undefined;
  cwd: string | undefined;
}) {
  const { userCommand, selectedText, cwd } = args;
  return new Promise<string>((resolve, reject) => {
    const process = exec(userCommand, { cwd }, (error, stdout, stderr) => {
      console.log("extension.ts process:", error, stdout, stderr);
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout);
    });

    if (selectedText) {
      process.stdin?.write(selectedText);
    }
    process.stdin?.end();
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
