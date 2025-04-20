// src/types/types.ts
export interface Card {
  id: string;
  title: string;
  description?: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  boardId: string;
}

export interface Board {
  id: string;
  title: string;
}

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
  addCard: (columnId: string, title: string, description: string) => void;
  updatedCard: (cardId: string, card: Partial<Card>) => void;
  moveCard: (cardId: string, newColumnId: string) => void;
  deleteCard: (cardId: string) => void;
}

export interface BoardActions {
  addBoard: (title: string) => void;
  removeBoard: (boardId: string) => void;
  __syncState: (state: AppState) => void;
  setCurrentBoard: (id: string) => void;
}

export type BoardStore = AppState & BoardActions & ColumnActions & CardActions;
