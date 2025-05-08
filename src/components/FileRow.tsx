import { useQueryClient } from "@tanstack/react-query";

import { files_table } from "~/server/db/schema";
import { deleteFile } from "~/server/actions/delete-file";
import { refreshDriveContent } from "~/queries/drive";

import fileIcon from "/file-icon.png";
import { FileIcon, Trash2Icon } from "lucide-react";
import Swal from "sweetalert2";

export function FileRow(props: {
  file: typeof files_table.$inferSelect;
  isRoot: boolean;
  userId: string;
  currentFolderId: number;
}) {
  const { userId, isRoot, file, currentFolderId } = props;

  const formattedDate = new Date(file.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const queryClient = useQueryClient();

  const handleDeleteFile = async () => {
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

    await deleteFile({ data: { fileId: file.id, userId } });

    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
      background: "#0C1324",
      color: "#fff",
    });

    await refreshDriveContent({ isRoot, currentFolderId, queryClient });
  };

  return (
    <li
      key={file.id}
      className="border-b border-slate-800 px-6 py-4 last:border-b-0 hover:bg-slate-800/20 transition-colors"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        {/* Table left */}
        <div className="col-span-10 sm:col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400 truncate"
            target="_blank"
          >
            {/* <img src={fileIcon} alt="" className="size-9" /> */}
            <FileIcon
              className="mr-3 shrink-0 text-blue-500 fill-blue-800"
              size={20}
            />
            <p>{file.name}</p>
          </a>
        </div>
        {/* Table right */}
        <div className="col-span-2 sm:col-span-6 grid grid-cols-12 text-gray-400">
          <div className="hidden lg:flex col-span-3">file</div>
          <div className="hidden md:flex col-span-4 lg:col-span-3">
            {file.size}
          </div>
          <div className=" hidden sm:flex col-span-6 md:col-span-4 lg:col-span-3">
            {formattedDate}
          </div>
          <div className="flex justify-center col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <button onClick={() => handleDeleteFile()}>
              <Trash2Icon
                size={20}
                aria-label="Delete file"
                className="hover:text-error "
              />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
