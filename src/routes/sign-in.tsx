import { SignInButton } from "@clerk/tanstack-react-start";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  beforeLoad: async ({ context }) => {
    const userId = context.userId;
    if (userId) {
      throw redirect({ to: "/drive" });
    }
  },
  component: () => (
    <div
      className="h-screen w-full bg-no-repeat bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/tanstack-background.png')" }}
    >
      <div className="w-full max-w-md rounded-2xl border bg-gray-900/70 p-10 text-white shadow-xl backdrop-blur-md">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Sign in</h2>
          <p className="text-neutral-400">to continue to TanStack Drive</p>
        </div>

        <SignInButton mode="modal">
          <button className="w-full mt-6 btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all">
            Sign in
          </button>
        </SignInButton>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Fast and secure cloud storage
        </p>
      </div>

      <footer className="absolute bottom-6 text-sm text-neutral-500">
        © {new Date().getFullYear()} TanStack Drive. All rights reserved.
      </footer>
    </div>
  ),
});
