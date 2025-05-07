import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

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
    <div
      className="h-svh w-full bg-no-repeat bg-cover bg-center flex items-center justify-start"
      style={{ backgroundImage: "url('/tanstack-background.png')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="sm:ml-10 md:ml-20 p-8 sm:p-4  max-w-lg flex flex-col space-y-5"
      >
        <h1 className="text-5xl font-bold mb-2">TanStack Drive</h1>
        <p className="text-lg mb-8">
          Secure cloud storage for your files. Access your files anywhere,
          anytime.
        </p>
        <Link
          to={userId ? "/drive" : "/sign-in"}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-800 text-lg font-semibold rounded-xl transition-all w-36 text-center"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
}
