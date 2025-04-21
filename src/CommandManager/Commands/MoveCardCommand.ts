import { BoardStore } from "@/stores/boardStore/Types/types";
import { Command } from "../Command";
import { StoreApi } from "zustand";
import { Card } from "@/types/Card";

export function MoveCardCommand(
  card: Card,
  newColumnId: string,
  store: StoreApi<BoardStore>
): Command {
  let oldColumnId: string | null = null;
  return {
    do: () => {
      oldColumnId = card.columnId;
      store.getState().moveCard(card.id, newColumnId);
    },
    undo: () => {
      if (oldColumnId) store.getState().moveCard(card.id, oldColumnId);
    },
  };
}
