import { useBoardStore } from "../../stores/useBoardStore";
import { Card } from "./Card";
import { Column as Columnn } from "../../types/types";
import { Button } from "@/components/ui/button";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import AddCardPopup from "./AddCardPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddColumnPopup from "./AddColumnPopup";
import { ConfirmDialog } from "../utils/ConfirmDialog";

export const Column = ({ column }: { column: Columnn }) => {
  const [addCardPopupOpened, setAddCardPopupOpened] = useState<boolean>(false);

  const { cards, addCard, updateColumn, deleteColumn } = useBoardStore();
  const columnCards = cards.filter((card) => card.columnId === column.id);

  const [updateColumnPopupOpened, setUpdateColumnPopupOpened] =
    useState<boolean>(false);

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

  const [deleteColumnPopup, setDeleteColumnPopup] = useState<boolean>(false);

  return (
    <div>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="w-64 p-3 bg-gray-100 rounded-lg flex flex-col gap-2 min-h-[200px] group"
      >
        <div className="flex justify-between items-start ">
          <h2
            onClick={() => console.log("hey")}
            className="font-semibold text-lg overflow-hidden"
          >
            {column.title}
          </h2>
          <div className="min-w-12">
            <div
              className="inline-flex cursor-pointer hover:bg-gray-300 border-box p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setDeleteColumnPopup(true)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <div
              className="inline-flex cursor-pointer hover:bg-gray-300 border-box p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setUpdateColumnPopupOpened(true)}
            >
              <FontAwesomeIcon icon={faPencil} />
            </div>
          </div>
        </div>

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
      <AddColumnPopup
        isShown={updateColumnPopupOpened}
        popupTitle="Update column."
        onClose={() => setUpdateColumnPopupOpened(false)}
        onAddColumn={(title) => {
          updateColumn(column.id, { title });
          setUpdateColumnPopupOpened(false);
        }}
        initialColumnName={column.title}
      />

      <ConfirmDialog
        open={deleteColumnPopup}
        onConfirm={() => {
          deleteColumn(column.id);
        }}
        onCancel={() => setDeleteColumnPopup(false)}
        title="Delete this column?"
        description="Once deleted, this column cannot be recovered."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
