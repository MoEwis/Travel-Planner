// import Image from "next/image";
// import Link from "next/link";
// import Login from "../login-logout";
// import { Session } from "next-auth";
// import { login, logout } from "@/lib/auth-actions";

// const Navbar = ({ session }: { session: Session | null }) => {
//   return (
//     <nav className="bg-white shadow-md py-4 border-b border-gray-400">
//       <div className="container mx-auto flex justify-between items-center  px-6 lg:px-8 ">
//         <Link href="/" className="flex items-center">
//           <Image src="/logo.png" alt="logo" width={40} height={40} />
//           <span className="text-2xl font-bold text-gray-800">
//             Travel Planner
//           </span>
//         </Link>
//         <div className="flex items-center space-x-4">
//           {session ? (
//             <>
//               <Link
//                 href="/trips"
//                 className="text-slate-900 hover:text-sky-800 font-semibold"
//               >
//                 My Trips
//               </Link>
//               <Link
//                 href="/globe"
//                 className="text-slate-900 hover:text-sky-800 font-semibold"
//               >
//                 Globe
//               </Link>
//               <Login state={logout} text="Logout" />
//             </>
//           ) : (
//             <Login state={login} text="Login" />
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import Image from "next/image";
import Link from "next/link";
import Login from "../login-logout";
import { Session } from "next-auth";
import { login, logout } from "@/lib/auth-actions";

const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-lg py-3 border-b border-blue-200">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="logo"
            width={44}
            height={44}
            className="rounded-full shadow-md"
          />
          <span className="text-3xl font-extrabold text-blue-800 tracking-tight group-hover:text-blue-600 transition-colors">
            Travel Planner
          </span>
        </Link>
        <div className="flex items-center gap-2 md:gap-6">
          {session ? (
            <>
              <Link
                href="/trips"
                className="px-4 py-2 rounded-lg font-semibold text-blue-900 hover:bg-blue-100 hover:text-blue-700 transition"
              >
                My Trips
              </Link>
              <Link
                href="/globe"
                className="px-4 py-2 rounded-lg font-semibold text-blue-900 hover:bg-blue-100 hover:text-blue-700 transition"
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
