import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

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

export const foldersQueryOptions = () =>
  queryOptions({
    queryKey: ["folders"],
    queryFn: () => getAllFolder(),
  });
