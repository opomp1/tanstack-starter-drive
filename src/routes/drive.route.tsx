import { SignIn, useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/drive")({
  component: DriveComponent,
});

function DriveComponent() {
  const user = useAuth();
  if (!user.userId) {
    return (
      <div className="flex items-center justify-center p-12">
        <SignIn routing="hash" forceRedirectUrl={window.location.href} />
      </div>
    );
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
