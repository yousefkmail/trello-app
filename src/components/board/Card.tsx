// src/components/Board/Card.tsx
import { useDraggable } from "@dnd-kit/core";
import { Card as Cardd } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddCardPopup from "./AddCardPopup";
import { useState } from "react";
import { useBoardStore } from "@/stores/useBoardStore";
import { ConfirmDialog } from "../utils/ConfirmDialog";
export const Card = ({ card }: { card: Cardd }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.id,
    data: {
      type: "card",
      cardId: card.id,
    },
  });

  const { updatedCard, deleteCard } = useBoardStore();
  const [updateCardPopupOpened, setUpdateCardPopupOpened] =
    useState<boolean>(false);
  const [deleteCardPopup, setDeleteCardPopup] = useState<boolean>(false);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`p-3 bg-white rounded shadow cursor-pointer group`}
    >
      <div className="flex justify-between items-center ">
        <h3 className="font-medium overflow-hidden">{card.title}</h3>
        <div>
          <div
            className="inline-flex cursor-pointer hover:bg-gray-300 border-box p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setDeleteCardPopup(true)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
          <div
            className="inline-flex cursor-pointer hover:bg-gray-300 border-box p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
        onClose={() => {
          setUpdateCardPopupOpened(false);
        }}
        titleInitialValue={card.title}
        descriptionInitialValue={card.description}
        popupTitle="Update card"
        onAddCard={(title, description) => {
          updatedCard(card.id, { description, title });
          setUpdateCardPopupOpened(false);
        }}
      />

      <ConfirmDialog
        open={deleteCardPopup}
        onConfirm={() => {
          deleteCard(card.id);
        }}
        onCancel={() => setDeleteCardPopup(false)}
        title="Delete this Card?"
        description="Once deleted, this card cannot be recovered."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
