import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/tanstack-react-start";

export function Navbar() {
  return (
    <div className="navbar bg-transparent shadow-sm">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl ">
          TanStack Drive
        </a>
      </div>
      <div className="mr-4">
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
