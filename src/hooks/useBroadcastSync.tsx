import { useBoardStore } from "@/stores/useBoardStore";
import { useEffect, useRef } from "react";

const CHANNEL_NAME = "trello-clone-sync";

export const useBroadcastSync = () => {
  const syncState = useBoardStore((state) => state.__syncState);
  const getState = useBoardStore.getState;

  const tabIdRef = useRef(crypto.randomUUID());

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);

    channel.onmessage = (event) => {
      console.log("Changes received");
      const { type, payload, origin } = event.data;

      if (type === "STATE_UPDATE" && origin !== tabIdRef.current) {
        const currentState = getState();
        const { boards, columns, cards } = currentState;
        const currentClone = { boards, columns, cards };

        const isDifferent =
          JSON.stringify(currentClone) !== JSON.stringify(payload);

        if (isDifferent) {
          syncState?.(payload);
        }
      }
    };

    const unsub = useBoardStore.subscribe((state) => {
      const { boards, columns, cards } = state;
      const cloned = { boards, columns, cards };

      channel.postMessage({
        type: "STATE_UPDATE",
        payload: cloned,
        origin: tabIdRef.current,
      });
    });

    return () => {
      unsub();
      channel.close();
    };
  }, []);
};
