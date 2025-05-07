import { FileRow, FolderRow } from "./file-row";
import { Link } from "@tanstack/react-router";
import { files_table, folders_table } from "~/db/schema";
import { UploadButton } from "~/utils/uploadthing";

import { useQueryClient } from "@tanstack/react-query";
import { FolderPlus } from "lucide-react";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[] | null;

  currentFolderId: number;
  isRoot: boolean;
  userId: string;
}) {
  const queryClient = useQueryClient();
  return (
    <div className="min-h-screen p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to="/drive">My Drive</Link>
                </li>
                {props.parents?.map((parent) => (
                  <li key={parent.id}>
                    <Link
                      to="/drive/$folderId"
                      params={{ folderId: String(parent.id) }}
                    >
                      {parent.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <button className="btn btn-accent btn-soft rounded-lg ">
            <FolderPlus />
            Create Folder
          </button> */}
        </div>
        <div className="rounded-lg  bg-base-300 shadow-xl">
          <div
            className={`border-gray-700 px-6 py-4 ${props.folders.length === 0 && props.files.length === 0 ? "" : "border-b"}`}
          >
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow
                key={file.id}
                file={file}
                isRoot={props.isRoot}
                userId={props.userId}
                currentFolderId={props.currentFolderId}
              />
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <UploadButton
            className="mt-8"
            endpoint="driveUploader"
            onClientUploadComplete={() => {
              if (props.isRoot) {
                queryClient.invalidateQueries({ queryKey: ["root-folder"] });
              } else {
                queryClient.invalidateQueries({
                  queryKey: ["folder", props.currentFolderId],
                });
              }
            }}
            input={{ folderId: props.currentFolderId }}
          />
        </div>
      </div>
    </div>
  );
}
