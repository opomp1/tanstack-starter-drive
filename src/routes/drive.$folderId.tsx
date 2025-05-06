import {
  createFileRoute,
  ErrorComponent,
  ErrorComponentProps,
} from "@tanstack/react-router";
import { Suspense } from "react";
import { NotFound } from "~/components/NotFound";

import { folderQuery } from "~/queries/drive";

import DriveFolderWithData from "~/components/DriveFolderWithData";
import DriveSkeleton from "~/components/DriveSkeleton";

export const Route = createFileRoute("/drive/$folderId")({
  errorComponent: DriveErrorComponent,
  component: DriveFolderComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  },
  loader: async ({ params: { folderId }, context }) => {
    const parsedFolderId = parseInt(folderId);
    const userId = context.userId;
    await context.queryClient.ensureQueryData(folderQuery(parsedFolderId));
    return { parsedFolderId, userId };
  },
});

export function DriveErrorComponent({ error }: ErrorComponentProps) {
  return (
    <NotFound>
      <ErrorComponent error={error} />
    </NotFound>
  );
}

function DriveFolderComponent() {
  const { parsedFolderId, userId } = Route.useLoaderData();

  return (
    <Suspense fallback={<DriveSkeleton />}>
      <DriveFolderWithData folderId={parsedFolderId} userId={userId} />
    </Suspense>
  );
}
