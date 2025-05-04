import { createFileRoute } from "@tanstack/react-router";
import DriveContents from "~/components/drive-content";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { QUERIES } from "~/server/db/queries";

export const Route = createFileRoute("/_drive/f/$folderId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const folderId = params.folderId;

    const files = mockFiles.filter((file) => file.parent === folderId);
    const folders = mockFolders.filter((folder) => folder.parent === folderId);
    const parents = QUERIES.getAllParensForFolder(folderId);

    return { files, folders, parents };
  },
});

function RouteComponent() {
  const { files, folders, parents } = Route.useLoaderData();

  return (
    <div>
      <DriveContents files={files} folders={folders} parents={parents} />
    </div>
  );
}
