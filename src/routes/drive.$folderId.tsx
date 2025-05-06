import {
  createFileRoute,
  ErrorComponent,
  ErrorComponentProps,
} from "@tanstack/react-router";
import DriveContents from "~/components/drive-content";
import { NotFound } from "~/components/NotFound";
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

    // if (folders.length === 0) {
    //   throw new Error("Folder not Found");
    // }

    const parents = await getAllParentsForFolder({ data: folderId });

    return { folders, files, parents, folderId };
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
  const { files, folders, parents, folderId } = Route.useLoaderData();

  return (
    <div>
      <DriveContents
        files={files}
        folders={folders}
        parents={parents}
        currentFolderId={folderId}
      />
    </div>
  );
}
