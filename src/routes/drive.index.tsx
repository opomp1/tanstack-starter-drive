import { createFileRoute } from "@tanstack/react-router";
import DriveContents from "~/components/drive-content";
import { QUERIES } from "~/db/queries";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { getAllFolder, getDataInRootFolder } from "~/utils/data";

export const Route = createFileRoute("/drive/")({
  component: DriveIndexComponent,
  // loader: async () => {
  //   const files = mockFiles.filter((file) => file.parent === "root");
  //   const folders = mockFolders.filter((folder) => folder.parent === "root");
  //   const parents = QUERIES.getAllParensForFolder("root");

  //   return { files, folders, parents };
  // },
  loader: async ({ context }) => {
    const userId = context.userId;
    console.log(userId);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { folders, files } = await getDataInRootFolder({ data: userId });

    const parents = [{}];

    console.log("folder", folders);

    return { folders, files, parents };
  },
});

function DriveIndexComponent() {
  const { files, folders, parents } = Route.useLoaderData();

  return (
    <div>
      <DriveContents files={files} folders={folders} parents={parents} />
    </div>
  );
}
