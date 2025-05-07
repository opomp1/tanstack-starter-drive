import { queryOptions, useQueryClient } from "@tanstack/react-query";
import {
  getDataInRootFolder,
  getAllDataFromFolderId,
  getAllParentsForFolder,
} from "~/server/actions/data";

export const rootFolderQuery = (userId: string) =>
  queryOptions({
    queryKey: ["root-folder", userId],
    queryFn: () => getDataInRootFolder({ data: userId }),
  });

export const folderQuery = (folderId: number) =>
  queryOptions({
    queryKey: ["folder", folderId],
    queryFn: async () => {
      const { folders, files } = await getAllDataFromFolderId({
        data: folderId,
      });
      const parents = await getAllParentsForFolder({ data: folderId });
      return { folders, files, parents, folderId: folderId };
    },
  });

export const refreshDriveContent = async ({
  isRoot,
  currentFolderId,
  queryClient,
}: {
  isRoot: boolean;
  currentFolderId: number;
  queryClient: ReturnType<typeof useQueryClient>;
}) => {
  if (isRoot) {
    queryClient.invalidateQueries({ queryKey: ["root-folder"] });
  } else {
    queryClient.invalidateQueries({ queryKey: ["folder", currentFolderId] });
  }
};
