import { useQueryClient } from "@tanstack/react-query";

import { files_table } from "~/server/db/schema";
import { deleteFile } from "~/server/actions/delete-file";
import { refreshDriveContent } from "~/queries/drive";

import { FileIcon, Trash2Icon } from "lucide-react";
import Swal from "sweetalert2";

export function FileRow(props: {
  file: typeof files_table.$inferSelect;
  isRoot: boolean;
  userId: string;
  currentFolderId: number;
}) {
  const { userId, isRoot, file, currentFolderId } = props;

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
      background: "#181818",
      color: "#fff",
      iconColor: "orange",
    });

    if (!confirmed.isConfirmed) return;

    await deleteFile({ data: { fileId: file.id, userId } });

    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
      background: "#181818",
      color: "#fff",
    });

    await refreshDriveContent({ isRoot, currentFolderId, queryClient });
  };

  return (
    <li
      key={file.id}
      className=" border-b border-gray-700 px-6 py-4 last:border-b-0"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400 truncate"
            target="_blank"
          >
            <FileIcon className="mr-3 shrink-0" size={20} />
            <p>{file.name}</p>
          </a>
        </div>
        <div className="col-span-2 text-gray-400">file</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
        <div className="col-span-1 text-gray-400">
          <button onClick={() => handleDeleteFile()}>
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
