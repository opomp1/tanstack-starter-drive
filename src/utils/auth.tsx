import { getAuth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

export const authStateFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const req = getWebRequest();
    if (!req) {
      throw new Error("Request context not available");
    }

    const { userId } = await getAuth(req);
    console.log("userId from authStateFn:", userId);

    if (!userId) {
      throw redirect({
        to: "/sign-in",
      });
    }

    return { userId };
  }
);
