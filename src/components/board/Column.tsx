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
import { Card as ShadcnCard } from "../ui/card";

export const Column = ({
  column,
}: {
  column: ColumnModel;
  cardDropFeedback?: CardModel;
}) => {
  const [addCardPopupOpened, setAddCardPopupOpened] = useState<boolean>(false);

  const { cards } = useBoardStore();
  const { addCard, deleteColumn, updateColumn } = useBoardStoreCommand();
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
      column,
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
    cursor: isDragging ? "grabbing" : "auto",
  };

  return (
    <div>
      <ShadcnCard
        style={style}
        ref={setNodeRef}
        className="w-64 p-3 rounded-lg flex flex-col gap-2 min-h-[200px] relative"
      >
        <div
          {...attributes}
          {...listeners}
          className="flex justify-between items-start cursor-move"
        >
          <h2 className="font-semibold text-lg overflow-hidden text-foreground select-none">
            {column.title}
          </h2>

          <div className="flex ">
            <Button
              variant="destructive"
              onClick={() => setDeleteColumnPopup(true)}
              className="h-8 w-8 p-0 mr-2"
            >
              <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setUpdateColumnPopupOpened(true)}
              className="h-8 w-8 p-0 bg-primary text-white"
            >
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {columnCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
        <Button
          onClick={() => setAddCardPopupOpened(true)}
          className="justify-start text-foreground border-border"
          variant="outline"
        >
          + Add Card
        </Button>
      </ShadcnCard>

      <AddCardPopup
        isShown={addCardPopupOpened}
        onClose={() => setAddCardPopupOpened(false)}
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
          updateColumn({
            boardId: column.boardId,
            id: column.id,
            title,
            index: column.index,
          });
          setUpdateColumnPopupOpened(false);
        }}
        initialColumnName={column.title}
      />

      <ConfirmDialog
        open={deleteColumnPopup}
        onConfirm={() => {
          deleteColumn(column);
        }}
        onCancel={() => setDeleteColumnPopup(false)}
        title="Delete this column?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
