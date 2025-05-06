import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import DriveContents from "~/components/DriveContent";
import DriveSkeleton from "~/components/DriveSkeleton";
import { getDataInRootFolder } from "~/utils/data";

export const Route = createFileRoute("/_okay")({
  component: DriveIndexComponent,
  loader: async ({ context, params }) => {
    const userId = context.userId;
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

function DriveIndexWithData({ userId }: { userId: string }) {
  const { data } = useSuspenseQuery(rootFolderQuery(userId));

  return (
    <DriveContents
      files={data.files}
      folders={data.folders}
      parents={null}
      currentFolderId={data.rootFolderId}
    />
  );
}

const rootFolderQuery = (userId: string) => ({
  queryKey: ["root-folder"],
  queryFn: async () => {
    return await getDataInRootFolder({ data: userId });
  },
});
