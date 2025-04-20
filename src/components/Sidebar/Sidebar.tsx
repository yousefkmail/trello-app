import { useBoardStore } from "@/stores/useBoardStore";
import { Button } from "../ui/button";
import { useState } from "react";
import AddBoardPopup from "../board/AddBoardPopup";

export default function Sidebar() {
  const { addBoard, boards, setCurrentBoard, currentBoardId } = useBoardStore();
  const [addBoardPopupOpened, setAddBoardPopupOpened] =
    useState<boolean>(false);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select or Create a Board</h1>

      <div className="flex flex-col gap-2">
        {boards.map((board) => (
          <Button
            variant={currentBoardId === board.id ? "destructive" : "ghost"}
            key={board.id}
            onClick={() => setCurrentBoard(board.id)}
          >
            {board.title}
          </Button>
        ))}
        <Button onClick={() => setAddBoardPopupOpened(true)}>
          Create Board
        </Button>
        <AddBoardPopup
          isShown={addBoardPopupOpened}
          onClose={() => setAddBoardPopupOpened(false)}
          onCreateBoard={(boardName) => {
            addBoard(boardName);
            setAddBoardPopupOpened(false);
          }}
        />
      </div>
    </div>
  );
}
