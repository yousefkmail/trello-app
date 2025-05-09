import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card as CardModel } from "@/types/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddCardPopup from "./AddCardPopup";
import { useState } from "react";
import { ConfirmDialog } from "../utils/ConfirmDialog";
import { useBoardStoreCommand } from "@/CommandManager/useBoardStoreCommand";
export const Card = ({ card }: { card: CardModel }) => {
  const { updateCard, deleteCard } = useBoardStoreCommand();
  const [updateCardPopupOpened, setUpdateCardPopupOpened] = useState(false);
  const [deleteCardPopup, setDeleteCardPopup] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,

    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
      cardId: card.id,
      columnId: card.columnId,
      card,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "move",
  };

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="p-3  rounded shadow cursor-move group overflow-hidden border transition-colors bg-background cursor-move"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-foreground overflow-hidden">
            {card.title}
          </h3>
          <div className="flex gap-1">
            <div
              className="inline-flex cursor-pointer hover:bg-muted p-1 rounded-full opacity-0 group-hover:opacity-100 text-destructive transition-opacity"
              onClick={() => setDeleteCardPopup(true)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <div
              className="inline-flex cursor-pointer hover:bg-muted p-1 rounded-full opacity-0 group-hover:opacity-100 text-accent transition-opacity"
              onClick={() => setUpdateCardPopupOpened(true)}
            >
              <FontAwesomeIcon icon={faPencil} />
            </div>
          </div>
        </div>

        {card.description && (
          <p className="text-sm text-muted-foreground">{card.description}</p>
        )}
      </div>
      <AddCardPopup
        isShown={updateCardPopupOpened}
        onClose={() => setUpdateCardPopupOpened(false)}
        titleInitialValue={card.title}
        descriptionInitialValue={card.description}
        popupTitle="Update card"
        onAddCard={(title, description) => {
          updateCard({
            id: card.id,
            title,
            description,
            columnId: card.columnId,
          });
          setUpdateCardPopupOpened(false);
        }}
      />
      <ConfirmDialog
        open={deleteCardPopup}
        onConfirm={() => deleteCard(card)}
        onCancel={() => setDeleteCardPopup(false)}
        title="Delete this Card?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
