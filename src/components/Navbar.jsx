import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export default function Navbar() {
  const { username, isLogin } = useContext(UserContext);
  return (
    <header className="fixed w-full top-0 left-0 z-20 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-3xl">
          Logo
        </Link>
        <div className="flex items-center gap-8">
          {isLogin ? (
            <div className="rounded-full font-bold w-10 h-10 flex items-center justify-center text-white  bg-emerald-500 text-whit">
              {username.split("")[0]}
            </div>
          ) : (
            <Link
              to="login"
              className="bg-emerald-500 text-white px-3 py-2 rounded-md"
            >
              Join Now
            </Link>
          )}
          {isLogin  && (
            <button className="px-3 py-2 bg-emerald-500 text-white rounded-md">
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
