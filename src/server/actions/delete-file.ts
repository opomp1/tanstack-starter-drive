import { createServerFn } from "@tanstack/react-start";
import { UTApi } from "uploadthing/server";
import { eq, and } from "drizzle-orm";

import { db } from "~/server/db";
import { files_table } from "~/server/db/schema";

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
