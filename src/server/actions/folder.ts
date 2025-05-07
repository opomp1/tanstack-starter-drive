import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";

import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";

export const createFolder = createServerFn()
  .validator(
    (input: { folderId: number; folderName: string; userId: string }) => input
  )
  .handler(async (ctx) => {
    const { folderId, folderName, userId } = ctx.data;

    const folder = await db
      .select()
      .from(folders_table)
      .where(
        and(eq(folders_table.id, folderId), eq(folders_table.ownerId, userId))
      );

    if (!folder[0]) {
      throw new Error("Parent folder not found!");
    }

    const result = await db
      .insert(folders_table)
      .values({ name: folderName, parent: folderId, ownerId: userId });

    return { success: true, result };
  });

export const renameFolder = createServerFn()
  .validator(
    (input: { folderId: number; newName: string; userId: string }) => input
  )
  .handler(async (ctx) => {
    const { folderId, newName, userId } = ctx.data;

    const folder = await db
      .select()
      .from(folders_table)
      .where(
        and(eq(folders_table.id, folderId), eq(folders_table.ownerId, userId))
      );

    if (!folder[0]) {
      throw new Error("Folder not found or unauthorized.");
    }

    await db
      .update(folders_table)
      .set({ name: newName })
      .where(
        and(eq(folders_table.id, folderId), eq(folders_table.ownerId, userId))
      );

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
