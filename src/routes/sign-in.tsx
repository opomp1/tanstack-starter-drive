import { SignedOut, SignInButton } from "@clerk/tanstack-react-start";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { CloudIcon, CloudSun, File, Folder } from "lucide-react";

export const Route = createFileRoute("/sign-in")({
  beforeLoad: async ({ context }) => {
    const userId = context.userId;
    if (userId) {
      throw redirect({ to: "/drive" });
    }
  },
  component: () => (
    <div className="h-full flex flex-col justify-center items-center pt-16 p-4">
      {/* <div className="mb-8 flex items-center justify-center space-x-2">
        <CloudSun className="h-12 w-12 text-white" />
        <h1 className="text-2xl font-bold text-white">
          Sign in to access your files
        </h1>
      </div> */}

      <div className="w-full max-w-md space-y-4 rounded-lg border bg-neutral-900/60 p-10 text-white shadow-xl backdrop-blur-sm">
        <div className="space-y-2">
          <div className="text-center text-2xl font-bold">Sign in</div>
          <div className="text-center text-neutral-400">
            Please sign in to continue
          </div>
        </div>

        <SignInButton mode="modal">
          <button className="w-full btn btn-primary">Sign in</button>
        </SignInButton>

        <div className="flex justify-center">
          <p className="text-sm text-neutral-400">
            Fast, private, and accessible cloud storage built for you.
          </p>
        </div>
      </div>
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} TanStack Drive Drive. All rights reserved.
      </footer>
    </div>
  ),
});
