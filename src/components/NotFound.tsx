import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CircleAlert } from "lucide-react";

export function NotFound({ children }: { children?: any }) {
  return (
    <div
      className="h-screen w-full bg-no-repeat bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/tanstack-background.png')" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl border bg-gray-900/70 p-10 text-gray-400 shadow-xl backdrop-blur-md"
      >
        <div className="space-y-2 text-center">
          <p className=" flex justify-center ">
            <CircleAlert className="size-20 text-error" />
          </p>
          <h2 className="text-3xl font-bold">
            The page you are looking for does not exist.
          </h2>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => window.history.back()}
            className="btn btn-success"
          >
            Go back
          </button>
          <Link to="/" className="btn btn-info">
            Start Over
          </Link>
        </div>
        <div className="pt-4 text-center text-sm text-neutral-400">
          {children}
        </div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-44 lg:bottom-6 text-sm text-neutral-500"
      >
        © {new Date().getFullYear()} TanStack Drive. All rights reserved.
      </motion.footer>
    </div>
  );
}
