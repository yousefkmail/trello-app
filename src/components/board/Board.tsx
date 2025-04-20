// src/components/Board/Board.tsx
import { useState } from "react";
import { useBoardStore } from "../../stores/useBoardStore";
import { Column } from "./Column";
import { Button } from "@/components/ui/button";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import AddColumnPopup from "./AddColumnPopup";

import { ConfirmDialog } from "../utils/ConfirmDialog";
import { xAxisCollisionDetection } from "@/XAxisCollisionDetection";

export const Board = () => {
  const {
    boards,
    columns,
    currentBoardId,
    addColumn,
    moveCard,
    moveColumn,
    removeBoard,
  } = useBoardStore();

  const currentBoard = boards.find((b) => b.id === currentBoardId);
  const boardColumns = columns.filter((col) => col.boardId === currentBoardId);

  const [addColumnPopupOpened, setAddColumnPopupOpened] =
    useState<boolean>(false);

  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleDelete = () => {
    if (!currentBoardId) return;
    removeBoard(currentBoardId);
    setShowConfirm(false);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  if (!currentBoardId) {
    return <></>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">{currentBoard?.title}</h1>
        <Button onClick={() => setShowConfirm(true)}>Delete Board</Button>
        <ConfirmDialog
          open={showConfirm}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
          title="Delete this board?"
          description="Once deleted, this board cannot be recovered."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>

      <div className="flex gap-4 overflow-visible pb-2">
        <DndContext
          sensors={sensors}
          collisionDetection={xAxisCollisionDetection}
          onDragEnd={(event: DragEndEvent) => {
            if (
              event.active.data.current?.type === "card" &&
              event.over?.data.current?.type === "column"
            ) {
              moveCard(event.active.id.toString(), event.over.id.toString());
            }
            if (
              event.active.data.current?.type === "column" &&
              event.over?.data.current?.type === "column" &&
              event.active.id !== event.over.id
            ) {
              const activeIndex = boardColumns.findIndex(
                (c) => c.id === event.active.id
              );
              const overIndex = boardColumns.findIndex(
                (c) => c.id === event.over?.id
              );
              if (activeIndex !== -1 && overIndex !== -1) {
                moveColumn(event.active.id as string, overIndex);
              }
            }
          }}
          onDragMove={(e) => console.log(e.over)}
        >
          <SortableContext
            items={boardColumns.map((c) => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            {boardColumns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
          </SortableContext>
        </DndContext>

        <Button
          onClick={() => setAddColumnPopupOpened(true)}
          className="h-fit min-w-[200px]"
        >
          + Add Column
        </Button>
        <AddColumnPopup
          isShown={addColumnPopupOpened}
          onClose={() => {
            setAddColumnPopupOpened(false);
          }}
          onAddColumn={(name) => {
            addColumn(name);
            setAddColumnPopupOpened(false);
          }}
        />
      </div>
    </div>
  );
};
