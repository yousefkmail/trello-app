import { BoardStore } from "@/stores/boardStore/Types/types";
import { Command } from "../Command";
import { StoreApi } from "zustand";
import { Board } from "@/types/Board";

export function AddBoardCommand(
  title: string,
  store: StoreApi<BoardStore>
): Command {
  let Board: Board | null = null;
  return {
    do: () => {
      const newBoard: Board = {
        id: crypto.randomUUID(),
        title,
      };
      Board = newBoard;
      store.setState((state) => {
        return {
          boards: [...state.boards, newBoard],
          currentBoardId: newBoard.id,
        };
      });
    },
    undo: () => {
      if (Board) store.getState().removeBoard(Board.id);
    },
  };
}
