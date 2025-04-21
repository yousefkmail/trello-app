import { useBoardStore } from "@/stores/boardStore/useBoardStore";
import { CommandManager } from "./CommandManager";
import { AddBoardCommand } from "./Commands/AddBoardCommand";
import { UpdateCardCommand } from "./Commands/UpdateCardCommand";
import { Card } from "@/types/Card";
import { Command } from "./Command";
import { DeleteCardCommand } from "./Commands/DeleteCardCommand";

export const commandManager = new CommandManager();

export const useBoardStoreCommand = () => {
  const addBoard = (title: string) => {
    ExecuteCommand(AddBoardCommand(title, useBoardStore));
  };

  const updateCard = (card: Card) => {
    ExecuteCommand(UpdateCardCommand(card, useBoardStore));
  };

  const deleteCard = (card: Card) => {
    ExecuteCommand(DeleteCardCommand(card, useBoardStore));
  };

  const ExecuteCommand = (command: Command) => {
    commandManager.execute(command);
  };

  return {
    undo: () => commandManager.undo(),
    redo: () => commandManager.redo(),
    addBoard,
    updateCard,
    deleteCard,
  };
};
