import {
  createFileRoute,
  ErrorComponent,
  ErrorComponentProps,
} from "@tanstack/react-router";
import DriveContents from "~/components/drive-content";
import { NotFound } from "~/components/NotFound";
import { QUERIES } from "~/db/queries";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { getAllDataFromFolderId, getAllParentsForFolder } from "~/utils/data";

export const Route = createFileRoute("/drive/$folderId")({
  errorComponent: DriveErrorComponent,
  component: DriveFolderComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  },
  loader: async ({ params }) => {
    const folderId = parseInt(params.folderId);

    const { folders, files } = await getAllDataFromFolderId({ data: folderId });
    const parents = await getAllParentsForFolder({ data: folderId });
    console.log("parent", parents);

    return { folders, files, parents };
  },
});

export function DriveErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function DriveFolderComponent() {
  const { files, folders, parents } = Route.useLoaderData();

  return (
    <div>
      <DriveContents files={files} folders={folders} parents={parents} />
    </div>
  );
}
