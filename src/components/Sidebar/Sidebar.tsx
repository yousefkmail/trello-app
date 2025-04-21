import { useBoardStore } from "@/stores/boardStore/useBoardStore";
import { Button } from "../ui/button";
import { useState } from "react";
import AddBoardPopup from "../board/AddBoardPopup";

export default function Sidebar() {
  const { boards, setCurrentBoard, currentBoardId, addBoard } = useBoardStore();
  // const { addBoard } = useBoardStoreCommand();
  const [addBoardPopupOpened, setAddBoardPopupOpened] =
    useState<boolean>(false);
  return (
    <div className="p-4">
      <h3 className="text-l font-bold mb-4">Select or create a board</h3>

      <div className="flex flex-col gap-2">
        {boards.map((board) => (
          <Button
            variant={currentBoardId === board.id ? "outline" : "link"}
            key={board.id}
            onClick={() => setCurrentBoard(board.id)}
            className="overflow-hidden"
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
