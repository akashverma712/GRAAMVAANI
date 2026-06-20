// components/UserActions.jsx
import { UserButton } from "@clerk/clerk-react";

export default function UserActions() {
  return (
    <div className="absolute top-4 right-6">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
