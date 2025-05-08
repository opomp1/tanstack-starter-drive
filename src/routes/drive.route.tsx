import { createFileRoute, Outlet } from "@tanstack/react-router";

import { onboardUser } from "~/server/actions/user";
import { authStateFn } from "~/utils/auth";
import { getRootFolder } from "~/server/actions/data";

import { Navbar } from "~/components/Navbar";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/drive")({
  component: DriveComponent,
  beforeLoad: async () => await authStateFn(),
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
  if (!userId) {
    return (
      <div
        className="min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, #09213f, #0b1d37, #0c1a30, #0d1629, #0c1222)",
        }}
      >
        <Loader2 className="size-10 animate-spin" />
        <p>Setting up your session...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-svh"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, #09213f, #0b1d37, #0c1a30, #0d1629, #0c1222)",
      }}
    >
      <Navbar />
      <Outlet />
    </div>
  );
}
