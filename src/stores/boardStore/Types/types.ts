import { Board } from "@/types/Board";
import { Card } from "@/types/Card";
import { Column } from "@/types/Column";

export interface AppState {
  boards: Board[];
  columns: Column[];
  cards: Card[];
  currentBoardId: string | null;
}

export interface ColumnActions {
  addColumn: (title: string) => void;
  updateColumn: (columnId: string, column: Partial<Column>) => void;
  moveColumn: (columnId: string, toIndex: number) => void;
  deleteColumn: (columnId: string) => void;
}

export interface CardActions {
  addCard: (columnId: string, title: string, description?: string) => void;
  updatedCard: (cardId: string, card: Partial<Card>) => void;
  moveCard: (cardId: string, newColumnId: string) => void;
  deleteCard: (cardId: string) => void;
}

export interface BoardActions {
  addBoard: (title: string) => void;
  removeBoard: (boardId: string) => void;
  updateBoard: (boardId: string, board: Partial<Board>) => void;
  __syncState: (state: AppState) => void;
  setCurrentBoard: (id: string) => void;
}

export type BoardStore = AppState & BoardActions & ColumnActions & CardActions;
