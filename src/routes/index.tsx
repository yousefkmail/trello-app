import { createFileRoute } from "@tanstack/react-router";
import Workspace from "@/components/Workspace/Workspace";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Workspace />
    </div>
  );
}
