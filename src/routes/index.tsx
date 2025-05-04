import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <>
        <Link to="/drive">My drive</Link>
      </>
    </div>
  );
}
