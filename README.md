# Pipe Command

## Overview

**Pipe Command** is a Visual Studio Code extension that allows you to pipe selected text to an external command for execution. If no text is selected, the command is executed without piping any text. The output from the command replaces the selected text in the editor.

## Features

- Pipe selected text to any external command.
- Replace selected text with the command output.
- Execute external commands directly if no text is selected.
- Easily accessible via the command palette or custom keybindings.

## How to Use

1. **Using the Command Palette:**

   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) to open the Command Palette.
   - Type `Pipe Command: pipe` and press Enter.
   - Enter the command you want to execute.

2. **Using a Keyboard Shortcut:**
   - You can bind a keyboard shortcut to the `pipe-command.pipe` command for quicker access.
   - To do this, go to `File > Preferences > Keyboard Shortcuts` and add a new keybinding.

## Example Usage

1. Select the text you want to pipe to an external command.
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) and type `Pipe Command: pipe`.
3. Enter the command you want to run with the selected text as input.
4. The output of the command will replace the selected text in your editor.

If no text is selected, the command will execute without any input, and the output will be inserted at the cursor position.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for `Pipe Command`.
4. Click `Install` to install the extension.

## Configuration

You can configure the extension settings to suit your needs. Currently, the extension does not have specific configurable settings, but you can customize keybindings for a more personalized workflow.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or pull requests, please visit the [GitHub repository](https://github.com/your-repository-link) to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/your-repository-link/LICENSE) file for details.
