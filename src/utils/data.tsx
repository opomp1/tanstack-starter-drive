import { createServerFn } from "@tanstack/react-start";
import { and, eq, isNull } from "drizzle-orm";

import { queryOptions } from "@tanstack/react-query";

import { db } from "~/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/db/schema";

export const getAllFolder = createServerFn().handler(async () => {
  const data = await db.select().from(foldersSchema);
  return data;
});

export const getDataInRootFolder = createServerFn()
  .validator((userId: string) => userId)
  .handler(async (ctx) => {
    const userId = ctx.data;
    const rootFolder = await db
      .select()
      .from(foldersSchema)
      .where(
        and(
          eq(foldersSchema.ownerId, userId),
          eq(foldersSchema.parent, isNull(foldersSchema.parent))
        )
      );
    const folders = await db
      .select()
      .from(foldersSchema)
      .where(
        and(
          eq(foldersSchema.ownerId, userId),
          eq(foldersSchema.parent, rootFolder[0].id)
        )
      )
      .orderBy(foldersSchema.id);

    const files = await db
      .select()
      .from(filesSchema)
      .where(
        and(
          eq(filesSchema.ownerId, userId),
          eq(filesSchema.parent, isNull(filesSchema.parent))
        )
      )
      .orderBy(filesSchema.id);

    return { folders, files };
  });

export const getAllDataFromFolderId = createServerFn()
  .validator((folderId: number) => folderId)
  .handler(async (ctx) => {
    const folderId = ctx.data;

    const folders = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId))
      .orderBy(foldersSchema.id);

    const files = await db
      .select()
      .from(filesSchema)
      .where(and(eq(filesSchema.parent, folderId)))
      .orderBy(filesSchema.id);

    return { folders, files };
  });

export const getAllParentsForFolder = createServerFn()
  .validator((folderId: number) => folderId)
  .handler(async (ctx) => {
    const folderId = ctx.data;
    const parents = [];
    let currentId: number | null = folderId;

    while (currentId !== null) {
      const folder = await db
        .select()
        .from(foldersSchema)
        .where(and(eq(foldersSchema.id, currentId)));

      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }

      if (folder[0].parent === null) {
        break;
      }

      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }

    return parents;
  });

export const foldersQueryOptions = () =>
  queryOptions({
    queryKey: ["folders"],
    queryFn: () => getAllFolder(),
  });
