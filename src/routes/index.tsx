import { createFileRoute, Link } from "@tanstack/react-router";
import { authStateFn } from "~/utils/auth";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: () => authStateFn(),
  loader: async ({ context }) => {
    return { userId: context.userId };
  },
});

function Home() {
  const state = Route.useLoaderData();

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Your ID is {state.userId}</p>
    </div>
  );
}
