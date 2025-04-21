import CustomSidebar from "@/components/Sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider>
      <CustomSidebar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </SidebarProvider>
  ),
});
