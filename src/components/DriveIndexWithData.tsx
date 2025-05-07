import { useSuspenseQuery } from "@tanstack/react-query";
import { rootFolderQuery } from "~/queries/drive";

import DriveContents from "~/components/DriveContent";

export default function DriveIndexWithData({ userId }: { userId: string }) {
  const { data } = useSuspenseQuery(rootFolderQuery(userId));

  return (
    <DriveContents
      files={data.files}
      folders={data.folders}
      parents={null}
      currentFolderId={data.rootFolderId}
      isRoot={true}
      userId={userId}
    />
  );
}
