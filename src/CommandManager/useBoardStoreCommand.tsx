import { useBoardStore } from "@/stores/boardStore/useBoardStore";
import { CommandManager } from "./CommandManager";
import { AddBoardCommand } from "./Commands/AddBoardCommand";
import { UpdateCardCommand } from "./Commands/UpdateCardCommand";
import { Card } from "@/types/Card";
import { Command } from "./Command";
import { DeleteCardCommand } from "./Commands/DeleteCardCommand";
import { MoveCardCommand } from "./Commands/MoveCardCommand";
import { AddColumnCommand } from "./Commands/AddColumnCommand";
import { AddCardCommand } from "./Commands/AddCardCommand";

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

  const moveCard = (card: Card, columnId: string) => {
    ExecuteCommand(MoveCardCommand(card, columnId, useBoardStore));
  };

  const addColumn = (title: string) => {
    ExecuteCommand(AddColumnCommand(title, useBoardStore));
  };

  const addCard = (title: string, columnId: string, description?: string) => {
    ExecuteCommand(AddCardCommand(title, columnId, useBoardStore, description));
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
    moveCard,
    addColumn,
    addCard,
  };
};
