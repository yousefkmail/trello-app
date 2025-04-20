import Sidebar from "@/components/Sidebar/Sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex h-screen">
        <div className="w-64 bg-gray-100 p-4">
          <Sidebar />
        </div>

        <div className="flex-1 p-4 overflow-hidden">
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </div>
    </>
  ),
});
