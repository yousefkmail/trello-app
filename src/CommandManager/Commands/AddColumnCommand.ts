import { BoardStore } from "@/stores/boardStore/Types/types";
import { Command } from "../Command";
import { StoreApi } from "zustand";
import { Column } from "@/types/Column";

export function AddColumnCommand(
  title: string,
  store: StoreApi<BoardStore>
): Command {
  let Column: Column;
  return {
    do: () => {
      const { currentBoardId } = store.getState();
      if (!currentBoardId) return;
      const index = store
        .getState()
        .columns.filter((item) => item.boardId === currentBoardId).length;

      Column = {
        id: crypto.randomUUID(),
        title,
        boardId: currentBoardId,
        index,
      };
      store.setState((state) => ({
        columns: [...state.columns, Column],
      }));
    },

    undo: () => {
      store.getState().deleteColumn(Column.id);
    },
  };
}
