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
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 bg-white rounded shadow cursor-pointer group"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium overflow-hidden">{card.title}</h3>
        <div>
          <div
            className="inline-flex cursor-pointer hover:bg-gray-300 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setDeleteCardPopup(true)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
          <div
            className="inline-flex cursor-pointer hover:bg-gray-300 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setUpdateCardPopupOpened(true)}
          >
            <FontAwesomeIcon icon={faPencil} />
          </div>
        </div>
      </div>

      {card.description && (
        <p className="text-sm text-gray-600">{card.description}</p>
      )}

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
        description="Once deleted, this card cannot be recovered."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
