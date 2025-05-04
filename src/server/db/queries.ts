import { mockFolders } from "~/lib/mock-data";

export const QUERIES = {
  getAllParensForFolder: function (folderId: string) {
    const parents: typeof mockFolders = [];
    let currentId: string | null = folderId;

    while (currentId && currentId !== "root") {
      const folder = mockFolders.find((f) => f.id === currentId);
      if (!folder) break;
      parents.unshift(folder);
      currentId = folder.parent;
    }

    return parents;
  },
};
