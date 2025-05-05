import { SignIn, useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { authStateFn } from "~/utils/auth";
import { getRootFolder, onboardUser } from "~/utils/data";

export const Route = createFileRoute("/drive")({
  component: DriveComponent,
  beforeLoad: () => authStateFn(),
  loader: async ({ context }) => {
    const userId = context.userId;
    let rootFolder = await getRootFolder({ data: userId });

    if (!rootFolder) {
      try {
        await onboardUser({ data: userId });
        rootFolder = await getRootFolder({ data: userId });
      } catch (err) {
        console.error("Failed to onboard user", err);
        throw new Response("Failed to onboard user", { status: 500 });
      }
    }

    return { userId, rootFolder };
  },
});

function DriveComponent() {
  const { userId, rootFolder } = Route.useLoaderData();

  if (!rootFolder) {
    return (
      <div className="h-svh w-full flex justify-center items-center">
        <Loader2 className="size-10  animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
