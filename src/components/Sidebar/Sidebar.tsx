import { useBoardStore } from "@/stores/boardStore/useBoardStore";
import { Button } from "../ui/button";
import { useState } from "react";
import AddBoardPopup from "../board/AddBoardPopup";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import { Plus } from "lucide-react";
export default function CustomSidebar() {
  const { boards, setCurrentBoard, currentBoardId, addBoard } = useBoardStore();
  const [addBoardPopupOpened, setAddBoardPopupOpened] =
    useState<boolean>(false);
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold text-sidebar-foreground">
          Trello Clone
        </h2>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Your Boards
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-green-800  hover:text-primary hover:bg-transparent"
              onClick={() => setAddBoardPopupOpened(true)}
            >
              <Plus className="h-4 w-4 " />
            </Button>
          </div>

          <div className="flex flex-col gap-1">
            {boards.map((board) => (
              <Button
                variant={currentBoardId === board.id ? "secondary" : "ghost"}
                size="sm"
                key={board.id}
                onClick={() => setCurrentBoard(board.id)}
                className={`w-full justify-start truncate text-left ${
                  currentBoardId === board.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-sidebar-foreground hover:bg-accent/50"
                }`}
              >
                <span className="truncate">{board.title}</span>
              </Button>
            ))}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <AddBoardPopup
        isShown={addBoardPopupOpened}
        onClose={() => setAddBoardPopupOpened(false)}
        onCreateBoard={(boardName) => {
          addBoard(boardName);
          setAddBoardPopupOpened(false);
        }}
      />
    </Sidebar>
  );
}
