import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { folders_table } from "~/server/db/schema";
import { deleteFolder } from "~/server/actions/folder";
import { refreshDriveContent } from "~/queries/drive";

import { Ellipsis, Folder as FolderIcon } from "lucide-react";
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

  const formattedDate = new Date(folder.createdAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

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
      background: "#0C1324",
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
          background: "#0C1324",
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
      background: "#0C1324",
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
        background: "#0C1324",
        color: "#fff",
      });

      await refreshDriveContent({ isRoot, currentFolderId, queryClient });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Can't delete folder",
        text: "Please remove all subfolders before deleting this folder.",
        background: "#0C1324",
        color: "#fff",
      });
    }
  };

  return (
    <li
      key={folder.id}
      className="border-b border-slate-800 px-6 py-4 last:border-b-0 hover:bg-slate-800/20 transition-colors"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        {/*Table left */}
        <div className="col-span-10 sm:col-span-6 flex items-center">
          <Link
            to="/drive/$folderId"
            params={{ folderId: String(folder.id) }}
            className="flex items-center text-gray-100 hover:text-blue-400 truncate gap-2"
          >
            {/* <img src={folderIcon} alt="" className="size-6" /> */}
            <FolderIcon
              className="mr-2 shrink-0 text-blue-600 fill-blue-800"
              size={20}
            />
            {folder.name}
          </Link>
        </div>

        {/* Table right */}
        <div className="col-span-2 sm:col-span-6 grid grid-cols-12 text-gray-400">
          <div className="hidden lg:flex col-span-3">Folder</div>
          <div className="hidden md:flex col-span-4 lg:col-span-3"></div>
          <div className=" hidden sm:flex col-span-6 md:col-span-4 lg:col-span-3">
            {formattedDate}
          </div>
          <div className="flex justify-center col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <div className="dropdown dropdown-end text-center">
              <button tabIndex={0} className="btn btn-ghost btn-xs">
                <Ellipsis size={18} />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 bg-slate-800 border border-slate-600 shadow-lg rounded-md w-20 z-50"
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
