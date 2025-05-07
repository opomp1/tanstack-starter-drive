import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";

import { db } from "~/server/db";
import { folders_table } from "~/server/db/schema";

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
