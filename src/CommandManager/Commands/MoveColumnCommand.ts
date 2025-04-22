import { BoardStore } from "@/stores/boardStore/Types/types";
import { Command } from "../Command";
import { StoreApi } from "zustand";
import { Column } from "@/types/Column";

export function MoveColumnCommand(
  column: Column,
  newIndex: number,
  store: StoreApi<BoardStore>
): Command {
  let oldIndex: number;
  return {
    do: () => {
      let foundColumn = store
        .getState()
        .columns.find((c) => c.id === column.id);
      if (!foundColumn) return;
      oldIndex = foundColumn?.index;

      store.getState().moveColumn(column.id, newIndex);
    },
    undo: () => {
      store.getState().moveColumn(column.id, oldIndex);
    },
  };
}
