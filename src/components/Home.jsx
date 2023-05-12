import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const { username } = useContext(UserContext);

  return (
    <div className="h-screen flex items-center justify-center text-3xl font-bold">
      Hello {username ? username : "Guest"}
    </div>
  );
}
