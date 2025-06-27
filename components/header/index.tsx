import Image from "next/image";
import Link from "next/link";
import Login from "../login";
import { Session } from "next-auth";
import { login, logout } from "@/lib/auth-actions";

const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-400">
      <div className="container mx-auto flex justify-between items-center  px-6 lg:px-8 ">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <span className="text-2xl font-bold text-gray-800">
            Travel Planner
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link
                href="/trips"
                className="text-slate-900 hover:text-sky-800 font-semibold"
              >
                My Trips
              </Link>
              <Link
                href="/globe"
                className="text-slate-900 hover:text-sky-800 font-semibold"
              >
                Globe
              </Link>
              <Login state={logout} text="Logout" />
            </>
          ) : (
            <Login state={login} text="Login" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
