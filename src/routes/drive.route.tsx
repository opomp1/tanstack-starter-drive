import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/drive")({
  component: DriveComponent,
});

function DriveComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
