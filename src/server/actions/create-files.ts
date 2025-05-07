import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";

export async function createFile({
  file,
  userId,
}: {
  file: {
    name: string;
    size: number;
    url: string;
    parent: number;
  };
  userId: string;
}) {
  return await db.insert(filesSchema).values({ ...file, ownerId: userId });
}

export async function getFolderById(folderId: number) {
  const folder = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.id, folderId));
  return folder[0];
}
