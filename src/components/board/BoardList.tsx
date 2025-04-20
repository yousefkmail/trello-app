import { useBoardStore } from "@/stores/useBoardStore";
import { Button } from "@/components/ui/button";

export default function BoardList() {
  const { addBoard, boards, setCurrentBoard } = useBoardStore();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select or Create a Board</h1>

      <div className="flex flex-row gap-2">
        {boards.map((board) => (
          <Button key={board.id} onClick={() => setCurrentBoard(board.id)}>
            {board.title}
          </Button>
        ))}
        <Button onClick={() => addBoard("New Board")}>Create Board</Button>
      </div>
    </div>
  );
}
