import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { folders_table } from "~/server/db/schema";
import { deleteFolder } from "~/server/actions/folder";
import { refreshDriveContent } from "~/queries/drive";

import { Ellipsis, Folder as FolderIcon, Trash2Icon } from "lucide-react";
import Swal from "sweetalert2";
import { renameFolder } from "~/server/actions/folder";
import toast from "react-hot-toast";

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
  isRoot: boolean;
  userId: string;
  currentFolderId: number;
}) {
  const { folder, userId, isRoot, currentFolderId } = props;
  const queryClient = useQueryClient();

  const handleRenameFolder = async () => {
    const { value: newName, isConfirmed } = await Swal.fire({
      title: "Rename Folder",
      input: "text",
      inputValue: folder.name,
      showCancelButton: true,
      confirmButtonText: "Rename",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "#181818",
      color: "#fff",
      inputValidator: (value) => {
        if (!value) return "Folder name cannot be empty";
      },
    });

    if (isConfirmed && newName && newName !== folder.name) {
      try {
        await renameFolder({ data: { folderId: folder.id, newName, userId } });
        toast.success("Folder renamed successfully");
        await refreshDriveContent({ currentFolderId, isRoot, queryClient });
      } catch (err: any) {
        Swal.fire({
          title: "Rename Failed",
          text: err.message || "Something went wrong",
          icon: "error",
          background: "#181818",
          color: "#fff",
        });
      }
    }
  };

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
        {/* Folder name & link */}
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

        {/* Type */}
        <div className="col-span-6 flex justify-evenly">
          <div className=" text-gray-400">Folder</div>

          {/* Size (or placeholder) */}
          <div className=" text-gray-400 text-end"></div>

          {/* Options dropdown */}
          <div className=" text-gray-400 flex justify-center">
            <div className="dropdown dropdown-end text-center">
              <button tabIndex={0} className="btn btn-ghost btn-xs">
                <Ellipsis size={18} />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-28 z-50"
              >
                <li>
                  <button onClick={() => handleRenameFolder()}>Edit</button>
                </li>
                <li>
                  <button onClick={() => handleDeleteFolder()}>Delete</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
