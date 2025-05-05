import { createFileRoute } from "@tanstack/react-router";
import DriveContents from "~/components/drive-content";
import { QUERIES } from "~/db/queries";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { getDataInRootFolder } from "~/utils/data";

export const Route = createFileRoute("/drive/")({
  component: DriveIndexComponent,
  loader: async ({ context }) => {
    const userId = context.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { folders, files, rootFolder } = await getDataInRootFolder({
      data: userId,
    });

    return { folders, files, rootFolder };
  },
});

function DriveIndexComponent() {
  const { files, folders, rootFolder } = Route.useLoaderData();

  return (
    <div>
      <DriveContents
        files={files}
        folders={folders}
        parents={null}
        currentFolderId={rootFolder[0].id}
      />
    </div>
  );
}
