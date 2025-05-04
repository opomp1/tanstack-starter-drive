import type { File as FileType, Folder as FolderType } from "~/lib/mock-data";

import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react";

// import { Button } from "~/components/ui/button";
import { Link } from "@tanstack/react-router";

// import type { files_table, folders_table } from "~/server/db/schema";
// import { deleteFile } from "~/server/actions";

export function FileRow(props: { file: FileType }) {
  const { file } = props;
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
          <button
          //   variant="ghost" onClick={() => deleteFile(file.id)}
          >
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

export function FolderRow(props: { folder: FolderType }) {
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
