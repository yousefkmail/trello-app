import { useBroadcastSync } from "@/hooks/useBroadcastSync";
import { Board } from "../board/Board";

export default function Workspace() {
  useBroadcastSync();
  return (
    <div>
      <Board />
    </div>
  );
}
