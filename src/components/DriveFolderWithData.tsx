import { useSuspenseQuery } from "@tanstack/react-query";
import DriveContents from "~/components/drive-content";
import { folderQuery } from "~/queries/drive";

export default function DriveFolderWithData({
  folderId,
}: {
  folderId: string;
}) {
  const { data } = useSuspenseQuery(folderQuery(folderId));

  return (
    <DriveContents
      files={data.files}
      folders={data.folders}
      parents={data.parents}
      currentFolderId={data.folderId}
    />
  );
}
