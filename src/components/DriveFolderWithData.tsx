import { useSuspenseQuery } from "@tanstack/react-query";
import DriveContents from "~/components/DriveContent";
import { folderQuery } from "~/queries/drive";

export default function DriveFolderWithData({
  folderId,
  userId,
}: {
  folderId: number;
  userId: string;
}) {
  const { data } = useSuspenseQuery(folderQuery(folderId));

  return (
    <DriveContents
      files={data.files}
      folders={data.folders}
      parents={data.parents}
      currentFolderId={data.folderId}
      isRoot={false}
      userId={userId}
    />
  );
}
