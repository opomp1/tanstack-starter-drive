import { createServerFn } from "@tanstack/react-start";

import { db } from "~/server/db";
import { folders_table as foldersSchema } from "~/server/db/schema";

export const onboardUser = createServerFn()
  .validator((userId: string) => userId)
  .handler(async (ctx) => {
    console.log("---======Creating start folders=====---");
    const userId = ctx.data;
    const rootFolder = await db
      .insert(foldersSchema)
      .values({
        name: "Root",
        parent: null,
        ownerId: userId,
      })
      .$returningId();

    const rootFolderId = rootFolder[0]!.id;

    await db.insert(foldersSchema).values([
      {
        name: "Documents",
        parent: rootFolderId,
        ownerId: userId,
      },
      {
        name: "Shared",
        parent: rootFolderId,
        ownerId: userId,
      },
      {
        name: "Trash",
        parent: rootFolderId,
        ownerId: userId,
      },
    ]);

    return rootFolderId;
  });
