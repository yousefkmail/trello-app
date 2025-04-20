import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppState, Board, Column, Card, BoardStore } from "../types/types";

export const useBoardStore = create<BoardStore>()(
  persist(
    (set, get) => ({
      boards: [],
      columns: [],
      cards: [],
      currentBoardId: null,

      addBoard: (title: string) => {
        const newBoard: Board = {
          id: crypto.randomUUID(),
          title,
        };
        set((state) => ({
          boards: [...state.boards, newBoard],
          currentBoardId: newBoard.id,
        }));
      },

      setCurrentBoard: (id: string) => {
        set({ currentBoardId: id });
      },

      addColumn: (title: string) => {
        const { currentBoardId } = get();
        if (!currentBoardId) return;

        const newColumn: Column = {
          id: crypto.randomUUID(),
          title,
          boardId: currentBoardId,
        };
        set((state) => ({
          columns: [...state.columns, newColumn],
        }));
      },

      updateColumn: (columnId: string, column: Partial<Column>) => {
        set((state) => {
          return {
            columns: state.columns.map((oldColumn) =>
              oldColumn.id === columnId
                ? { ...oldColumn, ...column }
                : oldColumn
            ),
          };
        });
      },

      deleteColumn: (columnId: string) => {
        set((state) => {
          return {
            columns: state.columns.filter((column) => column.id !== columnId),
          };
        });
      },
      updatedCard: (cardId: string, card: Partial<Card>) => {
        set((state) => {
          return {
            cards: state.cards.map((oldCard) =>
              oldCard.id === cardId ? { ...oldCard, ...card } : oldCard
            ),
          };
        });
      },

      deleteCard: (cardId: string) => {
        set((state) => {
          return {
            cards: state.cards.filter((card) => card.id !== cardId),
          };
        });
      },
      removeBoard: (boardId: string) => {
        set((state) => {
          const updatedBoards = state.boards.filter(
            (board) => board.id !== boardId
          );
          return {
            boards: updatedBoards,
            currentBoardId:
              updatedBoards.length > 0 ? updatedBoards[0].id : null,
          };
        });
      },

      addCard: (columnId: string, title: string, description: string) => {
        const newCard: Card = {
          id: crypto.randomUUID(),
          title,
          columnId,
          description,
        };
        set((state) => ({
          cards: [...state.cards, newCard],
        }));
      },

      moveCard: (cardId: string, newColumnId: string) => {
        console.log(newColumnId);
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId ? { ...card, columnId: newColumnId } : card
          ),
        }));
      },
      moveColumn: (columnId: string, toIndex: number) => {
        set((state) => {
          const index = state.columns.findIndex((c) => c.id === columnId);
          if (index === -1 || toIndex === index) return {};
          const updated = [...state.columns];
          const [moved] = updated.splice(index, 1);
          updated.splice(toIndex, 0, moved);
          return { columns: updated };
        });
      },

      __syncState: (state: AppState) => {
        set(state);
      },
    }),
    {
      name: "trello-clone-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.__syncState = (newState: AppState) => {
            const channel = new BroadcastChannel("trello-clone-sync");
            channel.postMessage({
              type: "STATE_UPDATE",
              payload: newState,
            });
            channel.close();
          };
        }
      },
    }
  )
);
