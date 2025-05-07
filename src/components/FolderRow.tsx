import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { folders_table } from "~/server/db/schema";
import { deleteFolder } from "~/server/actions/delete-file";
import { refreshDriveContent } from "~/queries/drive";

import { Folder as FolderIcon, Trash2Icon } from "lucide-react";
import Swal from "sweetalert2";

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
  isRoot: boolean;
  userId: string;
  currentFolderId: number;
}) {
  const { folder, userId, isRoot, currentFolderId } = props;
  const queryClient = useQueryClient();

  const handleDeleteFolder = async () => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#181818",
      color: "#fff",
      iconColor: "orange",
    });

    if (!confirmed.isConfirmed) return;

    try {
      await deleteFolder({ data: { folderId: folder.id, userId } });

      Swal.fire({
        title: "Deleted!",
        text: "Your folder has been deleted.",
        icon: "success",
        background: "#181818",
        color: "#fff",
      });

      await refreshDriveContent({ isRoot, currentFolderId, queryClient });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Can't delete folder",
        text: "Please remove all subfolders before deleting this folder.",
        background: "#181818",
        color: "#fff",
      });
    }
  };

  return (
    <li
      key={folder.id}
      className="border-b border-gray-700 px-6 py-4 last:border-b-0"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            to="/drive/$folderId"
            params={{ folderId: String(folder.id) }}
            className="flex items-center text-gray-100 hover:text-blue-400 truncate"
          >
            <FolderIcon className="mr-3 shrink-0" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-2 text-gray-400">Folder</div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-1 text-gray-400">
          <button onClick={() => handleDeleteFolder()}>
            <Trash2Icon
              size={20}
              aria-label="Delete file"
              className="hover:text-error"
            />
          </button>
        </div>
      </div>
    </li>
  );
}
