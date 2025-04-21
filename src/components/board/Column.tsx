import { useBoardStore } from "../../stores/boardStore/useBoardStore";
import { Card } from "./Card";
import { Card as CardModel } from "@/types/Card";
import { Column as ColumnModel } from "@/types/Column";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddCardPopup from "./AddCardPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddColumnPopup from "./AddColumnPopup";
import { ConfirmDialog } from "../utils/ConfirmDialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoardStoreCommand } from "@/CommandManager/useBoardStoreCommand";

export const Column = ({
  column,
  cardDropFeedback,
}: {
  column: ColumnModel;
  cardDropFeedback?: CardModel;
}) => {
  const [addCardPopupOpened, setAddCardPopupOpened] = useState<boolean>(false);

  const { cards, updateColumn, deleteColumn } = useBoardStore();
  const { addCard } = useBoardStoreCommand();
  const columnCards = cards.filter((card) => card.columnId === column.id);

  const [updateColumnPopupOpened, setUpdateColumnPopupOpened] =
    useState<boolean>(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
    },
  });

  const transformWithoutScale = transform
    ? {
        x: transform?.x,
        y: transform?.y,
        scaleX: 1,
        scaleY: 1,
      }
    : null;

  const [deleteColumnPopup, setDeleteColumnPopup] = useState<boolean>(false);

  const style = {
    transform: CSS.Transform.toString(transformWithoutScale),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div>
      <div
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="w-64 p-3 bg-gray-100 rounded-lg flex flex-col gap-2 min-h-[200px] group"
      >
        <div className="flex justify-between items-start ">
          <h2 className="font-semibold text-lg overflow-hidden">
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
          {cardDropFeedback && (
            <Card key={cardDropFeedback.id} card={cardDropFeedback} />
          )}
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
          addCard(title, column.id, description);
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
