import { useSuspenseQuery } from "@tanstack/react-query";
import DriveContents from "~/components/drive-content";
import { rootFolderQuery } from "~/queries/drive";

export default function DriveIndexWithData({ userId }: { userId: string }) {
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
