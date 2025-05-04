import { createFileRoute } from "@tanstack/react-router";
import { SignIn, useAuth } from "@clerk/clerk-react";

export const Route = createFileRoute("/_drive/drive")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isSignedIn, userId } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center p-12">
        <SignIn routing="hash" forceRedirectUrl={window.location.href} />
      </div>
    );
  }
  return <div>Drive Home</div>;
}
