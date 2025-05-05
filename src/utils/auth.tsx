import { getAuth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

export const authStateFn = createServerFn({ method: "GET" }).handler(
  async () => {
    // Use `getAuth()` to retrieve the user's ID
    const { userId } = await getAuth(getWebRequest());

    // Protect the server function by checking if the user is signed in
    if (!userId) {
      // This might error if you're redirecting to a path that doesn't exist yet
      // You can create a sign-in route to handle this
      throw redirect({
        to: "/sign-in",
      });
    }

    return { userId };
  }
);
