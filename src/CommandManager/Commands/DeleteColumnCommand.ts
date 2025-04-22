import { BoardStore } from "@/stores/boardStore/Types/types";
import { Command } from "../Command";
import { StoreApi } from "zustand";
import { Column } from "@/types/Column";

export function DeleteColumnCommand(
  column: Column,
  store: StoreApi<BoardStore>
): Command {
  let columnData: Column;
  return {
    do: () => {
      columnData = column;
      store.getState().deleteColumn(column.id);
    },
    undo: () => {
      store.setState((state) => {
        return { columns: [...state.columns, columnData] };
      });
    },
  };
}
