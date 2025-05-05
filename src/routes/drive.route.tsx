import { SignIn, useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/drive")({
  component: DriveComponent,
  loader: async ({ context }) => {
    if (!context.userId) {
      throw redirect({ to: "/sign-in" });
    }
  },
});

function DriveComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
