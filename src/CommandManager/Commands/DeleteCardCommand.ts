import { BoardStore } from "@/stores/boardStore/Types/types";
import { Command } from "../Command";
import { StoreApi } from "zustand";
import { Card } from "@/types/Card";

export function DeleteCardCommand(
  card: Card,
  store: StoreApi<BoardStore>
): Command {
  let cardData: Card | null = null;
  return {
    do: () => {
      cardData = card;
      store.getState().deleteCard(card.id);
    },
    undo: () => {
      if (cardData)
        store
          .getState()
          .addCard(cardData.columnId, cardData.title, cardData.description);
    },
  };
}
