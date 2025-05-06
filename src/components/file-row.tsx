import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { files_table, folders_table } from "~/db/schema";
import { deleteFile } from "~/server/actions/delete-file";
import { useQueryClient } from "@tanstack/react-query";

export function FileRow(props: {
  file: typeof files_table.$inferSelect;
  isRoot: boolean;
  userId: string;
  currentFolderId: number;
}) {
  const { userId, isRoot, file, currentFolderId } = props;

  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this file?");
    if (!confirmed) return;

    await deleteFile({ data: { fileId: file.id, userId } });

    if (isRoot) {
      queryClient.invalidateQueries({ queryKey: ["root-folder"] });
    } else {
      queryClient.invalidateQueries({
        queryKey: ["folder", currentFolderId],
      });
    }
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
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-2 text-gray-400">file</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
        <div className="col-span-1 text-gray-400">
          <button onClick={() => handleDelete()}>
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

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  const { folder } = props;
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
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400">Folder</div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  );
}
