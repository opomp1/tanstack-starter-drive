import { createServerFn } from "@tanstack/react-start";
import { db } from "~/db";
import { folders_table } from "~/db/schema";

export const createFolder = createServerFn()
  .validator(
    (input: { folderId: number; folderName: string; userId: string }) => input
  )
  .handler(async (ctx) => {
    const { folderId, folderName, userId } = ctx.data;

    const result = await db
      .insert(folders_table)
      .values({ name: folderName, parent: folderId, ownerId: userId });

    return { success: true, result };
  });
