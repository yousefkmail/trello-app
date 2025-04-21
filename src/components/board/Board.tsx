import { useState } from "react";
import { useBoardStore } from "../../stores/boardStore/useBoardStore";
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
import { xAxisCollisionDetection } from "@/lib/dnd-kit/XAxisCollisionDetection";
import { useBoardStoreCommand } from "@/CommandManager/useBoardStoreCommand";

export const Board = () => {
  const { boards, columns, currentBoardId, moveColumn, removeBoard } =
    useBoardStore();

  const { addColumn } = useBoardStoreCommand();

  const { moveCard } = useBoardStoreCommand();

  const currentBoard = boards.find((b) => b.id === currentBoardId);
  const boardColumns = columns
    .filter((col) => col.boardId === currentBoardId)
    .sort((item1, item2) => item1.index - item2.index);
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

  const { undo } = useBoardStoreCommand();

  if (!currentBoardId) {
    return <></>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-4 overflow-hidden mr-4 text-foreground">
            {currentBoard?.title}
          </h1>
          <div>
            <Button
              onClick={() => setAddColumnPopupOpened(true)}
              className="h-fit min-w-[200px] mr-3 mb-3"
            >
              + Add Column
            </Button>
            <Button onClick={() => undo()}>Undo</Button>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <Button
              variant={"destructive"}
              onClick={() => setShowConfirm(true)}
            >
              Delete Board
            </Button>
          </div>
        </div>

        <ConfirmDialog
          open={showConfirm}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
          title="Delete this board?"
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
      <div className="flex gap-4 pb-2 overflow-visible">
        <DndContext
          sensors={sensors}
          collisionDetection={xAxisCollisionDetection}
          onDragEnd={(event: DragEndEvent) => {
            if (
              event.active.data.current?.type === "card" &&
              event.over?.data.current?.type === "column"
            ) {
              moveCard(
                event.active.data.current.card,
                event.over.id.toString()
              );
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
