import { SignIn, useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authStateFn } from "~/utils/auth";

export const Route = createFileRoute("/drive")({
  component: DriveComponent,
  beforeLoad: () => authStateFn(),
  loader: async ({ context }) => {
    return { userId: context.userId };
  },
});

function DriveComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
