import { BoardStore } from "@/stores/boardStore/Types/types";
import { Command } from "../Command";
import { StoreApi } from "zustand";
import { Board } from "@/types/Board";

export function UpdateBoardCommand(
  board: Board,
  store: StoreApi<BoardStore>
): Command {
  let oldData: Board;
  let newData: Board;
  return {
    do: () => {
      newData = board;

      let foundBoard = store.getState().boards.find((b) => b.id === board.id);
      if (!foundBoard) return;

      oldData = foundBoard;
      store.getState().updateBoard(newData.id, newData);
    },
    undo: () => {
      if (oldData) store.getState().updateBoard(oldData.id, oldData);
    },
  };
}
