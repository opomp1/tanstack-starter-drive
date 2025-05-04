import { File, Folder } from "~/lib/mock-data";
import { FileRow, FolderRow } from "./file-row";
import { Link } from "@tanstack/react-router";

export default function DriveContents(props: {
  files: File[];
  folders: Folder[];
  parents: Folder[];
}) {
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
                {props.parents.map((parent) => (
                  <li>
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
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        {/* <UploadButton
          className="mt-8"
          endpoint="driveUploader"
          onClientUploadComplete={() => {
            navigate.refresh();
          }}
          input={{ folderId: props.currentFolderId }}
        /> */}
      </div>
    </div>
  );
}
