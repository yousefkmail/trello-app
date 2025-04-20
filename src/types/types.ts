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

export interface BoardActions {
  addBoard: (title: string) => void;
  removeBoard: (boardId: string) => void;
  addColumn: (title: string) => void;
  addCard: (columnId: string, title: string, description: string) => void;
  moveCard: (cardId: string, newColumnId: string) => void;
  moveColumn: (columnId: string, toIndex: number) => void;
  __syncState: (state: AppState) => void;
  setCurrentBoard: (id: string) => void;
  // Add other actions as needed
}

// Combined type for the store
export type BoardStore = AppState & BoardActions;
