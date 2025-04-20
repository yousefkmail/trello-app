// src/hooks/useSyncTabs.ts
import { useEffect } from "react";
import { useBoardStore } from "../stores/useBoardStore";

export const useSyncTabs = () => {
  const { setState } = useBoardStore;

  useEffect(() => {
    const channel = new BroadcastChannel("trello-clone-sync");

    channel.addEventListener("message", (event) => {
      if (event.data.type === "STATE_UPDATE") {
        setState(event.data.payload);
      }
    });

    return () => {
      channel.close();
    };
  }, [setState]);

  const syncState = (state: any) => {
    const channel = new BroadcastChannel("trello-clone-sync");
    channel.postMessage({
      type: "STATE_UPDATE",
      payload: state,
    });
    channel.close();
  };

  return { syncState };
};
