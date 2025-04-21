import { BoardStore } from "@/stores/boardStore/Types/types";
import { Command } from "../Command";
import { StoreApi } from "zustand";
import { Card } from "@/types/Card";

export function AddCardCommand(
  title: string,
  columnId: string,
  store: StoreApi<BoardStore>,
  description?: string
): Command {
  let card: Card;
  return {
    do: () => {
      card = {
        id: crypto.randomUUID(),
        title,
        columnId,
        description,
      };
      store.setState((state) => ({
        cards: [...state.cards, card],
      }));
    },

    undo: () => {
      store.getState().deleteCard(card.id);
    },
  };
}
