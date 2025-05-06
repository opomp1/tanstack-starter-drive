import { SignInButton } from "@clerk/tanstack-react-start";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CloudSun } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => {
    const userId = context.userId;

    return userId;
  },
});

function Home() {
  const userId = Route.useLoaderData();

  return (
    <div className="h-full flex flex-col justify-center items-center pt-16 p-4 text-gray-300">
      <div className="mb-8 flex items-center justify-center space-x-2">
        <CloudSun className="h-12 w-12 text-amber-700 animate-bounce" />
        <h1 className="text-4xl font-bold ">TanStack Drive</h1>
        <CloudSun className="h-12 w-12 text-amber-700 animate-bounce" />
      </div>

      <div className="w-full max-w-md space-y-4 rounded-lg border bg-neutral-900/60 p-10  shadow-xl backdrop-blur-sm">
        <div className="space-y-2">
          <div className="text-center text-2xl font-bold">Welcome</div>
          <div className="text-center text-neutral-400">
            Your secure cloud storage solution
          </div>
        </div>
        <div className="flex flex-col items-center space-y-6">
          {userId ? (
            <Link to="/drive" className="w-full btn btn-primary">
              Get Started
            </Link>
          ) : (
            <Link to="/sign-in" className="w-full btn btn-primary">
              Get Started
            </Link>
          )}
        </div>
        <div className="flex justify-center">
          <p className="text-sm text-neutral-400">
            Access your files securely from anywhere
          </p>
        </div>
      </div>
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} TanStack Drive Drive. All rights reserved.
      </footer>
    </div>
  );
}
