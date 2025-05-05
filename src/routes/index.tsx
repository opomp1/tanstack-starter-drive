import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex items-center justify-center p-12">
      <Link to="/drive">My drive</Link>
    </div>
  );
}
