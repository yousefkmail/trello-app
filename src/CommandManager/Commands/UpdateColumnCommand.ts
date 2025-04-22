import { BoardStore } from "@/stores/boardStore/Types/types";
import { Command } from "../Command";
import { StoreApi } from "zustand";
import { Column } from "@/types/Column";

export function UpdateColumnCommand(
  column: Column,
  store: StoreApi<BoardStore>
): Command {
  let oldData: Column;
  let newData: Column;
  return {
    do: () => {
      newData = column;
      const foundColumn = store
        .getState()
        .columns.find((c) => c.id === column.id);
      if (!foundColumn) return;
      oldData = foundColumn;

      store.getState().updateColumn(newData.id, newData);
    },
    undo: () => {
      store.getState().updateColumn(oldData.id, oldData);
    },
  };
}
