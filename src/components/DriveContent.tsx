import { FileRow, FolderRow } from "./file-row";
import { Link } from "@tanstack/react-router";
import { files_table, folders_table } from "~/server/db/schema";
import { UploadButton } from "~/utils/uploadthing";

import { useQueryClient } from "@tanstack/react-query";
import { Folder, FolderPlus } from "lucide-react";
import Swal from "sweetalert2";
import { createFolder } from "~/server/actions/create-folder";
import { refreshDriveContent } from "~/queries/drive";
import toast from "react-hot-toast";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[] | null;

  currentFolderId: number;
  isRoot: boolean;
  userId: string;
}) {
  const queryClient = useQueryClient();

  const handleCreateFolder = async () => {
    const { value: name } = await Swal.fire({
      title: "Enter folder name",
      input: "text",
      background: "#181818",
      color: "#fff",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Create folder",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need folder name";
        }
      },
    });
    if (name) {
      await createFolder({
        data: {
          folderId: props.currentFolderId,
          folderName: name,
          userId: props.userId,
        },
      });

      await refreshDriveContent({
        isRoot: props.isRoot,
        currentFolderId: props.currentFolderId,
        queryClient,
      });
      toast.success("Folder created successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

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
                      <Folder className="h-4 w-4 stroke-current" />
                      {parent.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            className="btn btn-accent btn-soft rounded-lg "
            onClick={handleCreateFolder}
          >
            <FolderPlus />
            New Folder
          </button>
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
              refreshDriveContent({
                isRoot: props.isRoot,
                currentFolderId: props.currentFolderId,
                queryClient,
              });
              toast.success("File uploaded successfully!");
            }}
            input={{ folderId: props.currentFolderId }}
          />
        </div>
      </div>
    </div>
  );
}
