import { useBoardStore } from "@/stores/boardStore/useBoardStore";
import { CommandManager } from "./CommandManager";
import { AddBoardCommand } from "./Commands/AddBoardCommand";
import { UpdateCardCommand } from "./Commands/UpdateCardCommand";
import { Card } from "@/types/Card";

export const commandManager = new CommandManager();

export const useBoardStoreCommand = () => {
  const addBoard = (title: string) => {
    const command = AddBoardCommand(title, useBoardStore);
    commandManager.execute(command);
  };

  const updateCard = (card: Card) => {
    const command = UpdateCardCommand(card, useBoardStore);
    commandManager.execute(command);
  };

  return {
    undo: () => commandManager.undo(),
    redo: () => commandManager.redo(),
    addBoard,
    updateCard,
  };
};
