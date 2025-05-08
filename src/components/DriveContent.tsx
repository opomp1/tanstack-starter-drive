import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import { files_table, folders_table } from "~/server/db/schema";
import { UploadButton } from "~/utils/uploadthing";
import { createFolder } from "~/server/actions/folder";
import { refreshDriveContent } from "~/queries/drive";

import toast from "react-hot-toast";
import { Folder, FolderIcon, FolderPlus } from "lucide-react";
import Swal from "sweetalert2";

import { FolderRow } from "./FolderRow";
import { FileRow } from "./FileRow";

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
    const { value: name, isConfirmed } = await Swal.fire({
      title: "Enter folder name",
      input: "text",
      background: "#0C1324",
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
    if (isConfirmed && name) {
      try {
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
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Can't create folder",
          text: `${error?.message || "Something went wrong"}`,
          background: "#181818",
          color: "#fff",
        });
      }
    }
  };

  return (
    <div className="min-h-screen p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="breadcrumbs text-md">
              <ul className="flex-wrap ">
                <li>
                  <Link
                    to="/drive"
                    className="hover:text-blue-600 font-semibold"
                  >
                    My Drive
                  </Link>
                </li>
                {props.parents?.map((parent) => (
                  <li key={parent.id}>
                    <Link
                      to="/drive/$folderId"
                      params={{ folderId: String(parent.id) }}
                      className="flex items-center font-medium text-white hover:text-blue-600 truncate transition-colors"
                    >
                      <FolderIcon className="mr-1 shrink-0" size={20} />
                      {parent.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            className="btn btn-success btn-ghost text-success hover:text-black rounded-lg  shadow-sm"
            onClick={handleCreateFolder}
          >
            <FolderPlus className="size-5" />
            New Folder
          </button>
        </div>
        <div className="rounded-xl border border-blue-500/10 bg-transparent/20 shadow-[0_0_30px_rgba(0,119,191,0.03)]">
          <div
            className={`border-gray-700 px-6 py-4 ${props.folders.length === 0 && props.files.length === 0 ? "" : "border-b"}`}
          >
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              {/* Table Left */}
              <div className="col-span-10 sm:col-span-6">Name</div>
              {/* Table right */}
              <div className="col-span-2 sm:col-span-6 grid grid-cols-12">
                <div className="hidden lg:flex col-span-3">Type</div>
                <div className="hidden md:flex col-span-4 lg:col-span-3">
                  Size
                </div>
                <div className=" hidden sm:flex col-span-6 md:col-span-4 lg:col-span-3">
                  Created
                </div>
                <div className="flex justify-center col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"></div>
              </div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                isRoot={props.isRoot}
                userId={props.userId}
                currentFolderId={props.currentFolderId}
              />
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
