import { Command } from "./Command";

export class CommandManager {
  private history: Command[] = [];
  private future: Command[] = [];

  execute(command: Command) {
    command.do();
    this.history.push(command);
    this.future = [];
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.future.push(command);
    }
  }

  redo() {
    const command = this.future.pop();
    if (command) {
      command.do();
      this.history.push(command);
    }
  }

  clear() {
    this.history = [];
    this.future = [];
  }
}
