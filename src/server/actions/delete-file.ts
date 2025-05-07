import { createServerFn } from "@tanstack/react-start";
import { UTApi } from "uploadthing/server";
import { eq, and } from "drizzle-orm";

import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";

export const deleteFile = createServerFn()
  .validator((input: { fileId: number; userId: string }) => input)
  .handler(async (ctx) => {
    const { fileId, userId } = ctx.data;

    const [file] = await db
      .select()
      .from(files_table)
      .where(and(eq(files_table.id, fileId), eq(files_table.ownerId, userId)));

    if (!file) {
      return { error: "File not found" };
    }

    const utApi = new UTApi();
    await utApi.deleteFiles([
      file.url.replace("https://30z7oafsd2.ufs.sh/f/", ""),
    ]);

    await db.delete(files_table).where(eq(files_table.id, fileId));

    return { success: true };
  });

export const deleteFolder = createServerFn()
  .validator((input: { folderId: number; userId: string }) => input)
  .handler(async (ctx) => {
    const { folderId, userId } = ctx.data;

    const subfolders = await db
      .select()
      .from(folders_table)
      .where(
        and(
          eq(folders_table.parent, folderId),
          eq(folders_table.ownerId, userId)
        )
      );

    if (subfolders.length > 0) {
      throw new Error("Cannot delete folder: it contains subfolders.");
    }

    const filesInside = await db
      .select()
      .from(files_table)
      .where(
        and(eq(files_table.parent, folderId), eq(files_table.ownerId, userId))
      );

    if (filesInside.length > 0) {
      const utApi = new UTApi();
      const files = filesInside.map((file) =>
        file.url.replace("https://30z7oafsd2.ufs.sh/f/", "")
      );
      await utApi.deleteFiles(files);
    }

    await db
      .delete(files_table)
      .where(
        and(eq(files_table.parent, folderId), eq(files_table.ownerId, userId))
      );

    await db
      .delete(folders_table)
      .where(
        and(eq(folders_table.id, folderId), eq(folders_table.ownerId, userId))
      );

    return { success: true };
  });
