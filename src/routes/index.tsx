import { createFileRoute } from "@tanstack/react-router";
import Workspace from "@/components/Workspace/Workspace";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <div className="border-b-4">
        <SidebarTrigger></SidebarTrigger>
      </div>
      <Workspace />
    </div>
  );
}
