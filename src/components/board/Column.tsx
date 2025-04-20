import { useBoardStore } from "../../stores/useBoardStore";
import { Card } from "./Card";
import { Column as Columnn } from "../../types/types";
import { Button } from "@/components/ui/button";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import AddCardPopup from "./AddCardPopup";

export const Column = ({ column }: { column: Columnn }) => {
  const [addCardPopupOpened, setAddCardPopupOpened] = useState<boolean>(false);

  const { cards, addCard } = useBoardStore();
  const columnCards = cards.filter((card) => card.columnId === column.id);

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
  } = useDraggable({
    id: column.id,
    data: {
      type: "column",
    },
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: column.id,
    data: {
      type: "column",
      accepts: ["card"],
      columnId: column.id,
    },
  });

  const setNodeRef = (node: HTMLElement | null) => {
    setDraggableRef(node);
    setDroppableRef(node);
  };

  return (
    <div>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="w-64 p-3 bg-gray-100 rounded-lg flex flex-col gap-2 min-h-[200px]"
      >
        <h2
          onClick={() => console.log("hey")}
          className="font-semibold text-lg"
        >
          {column.title}
        </h2>
        <div className="flex flex-col gap-2">
          {columnCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
        <Button
          onClick={() => {
            setAddCardPopupOpened(true);
          }}
          className="justify-start"
          variant={"outline"}
        >
          + Add Card
        </Button>
      </div>

      <AddCardPopup
        isShown={addCardPopupOpened}
        onClose={() => {
          setAddCardPopupOpened(false);
        }}
        onAddCard={(title, description) => {
          addCard(column.id, title, description);
          setAddCardPopupOpened(false);
        }}
      />
    </div>
  );
};
