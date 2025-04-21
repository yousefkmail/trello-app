import { createFileRoute } from "@tanstack/react-router";
import Workspace from "@/components/Workspace/Workspace";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    enabled
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [enabled]);

  return (
    <div className="bg-background">
      <div className="border-b-4 flex justify-between py-2 px-4">
        <SidebarTrigger className="text-foreground"></SidebarTrigger>
        <div className="flex items-center">
          <Label className="text-foreground mr-2">Dark mode</Label>
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            className=" cursor-pointer"
          ></Switch>
        </div>
      </div>
      <Workspace />
    </div>
  );
}
