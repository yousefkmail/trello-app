import { BoardStore } from "@/stores/boardStore/Types/types";
import { Command } from "../Command";
import { StoreApi } from "zustand";
import { Card } from "@/types/Card";

export function UpdateCardCommand(
  card: Card,
  store: StoreApi<BoardStore>
): Command {
  let oldData: Card | null = null;
  let newData: Card | null = null;
  return {
    do: () => {
      newData = card;
      oldData = store.getState().cards.find((c) => c.id === card.id) ?? null;

      store.getState().updatedCard(newData.id, newData);
    },
    undo: () => {
      if (oldData) store.getState().updatedCard(oldData.id, oldData);
    },
  };
}
