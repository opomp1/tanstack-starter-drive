import { queryOptions } from "@tanstack/react-query";
import {
  getDataInRootFolder,
  getAllDataFromFolderId,
  getAllParentsForFolder,
} from "~/utils/data";

export const rootFolderQuery = (userId: string) =>
  queryOptions({
    queryKey: ["root-folder", userId],
    queryFn: () => getDataInRootFolder({ data: userId }),
  });

export const folderQuery = (folderId: string) =>
  queryOptions({
    queryKey: ["folder", folderId],
    queryFn: async () => {
      const id = parseInt(folderId);
      const { folders, files } = await getAllDataFromFolderId({ data: id });
      const parents = await getAllParentsForFolder({ data: id });
      return { folders, files, parents, folderId: id };
    },
  });
