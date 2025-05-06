import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import DriveIndexWithData from "~/components/DriveIndexWithData";
import DriveSkeleton from "~/components/DriveSkeleton";

import { rootFolderQuery } from "~/queries/drive";

export const Route = createFileRoute("/drive/")({
  component: DriveIndexComponent,
  loader: async ({ context }) => {
    const userId = context.userId;
    await context.queryClient.ensureQueryData(rootFolderQuery(userId));
    return userId;
  },
});

function DriveIndexComponent() {
  const userId = Route.useLoaderData();

  return (
    <Suspense fallback={<DriveSkeleton />}>
      <DriveIndexWithData userId={userId} />
    </Suspense>
  );
}
