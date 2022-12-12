import { useEffect, useState } from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Icon from "@material-tailwind/react/Icon";
import { HiHome, HiUser, HiMap, HiArchive } from "react-icons/hi";

export default function Sidebar({ props }) {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  // const navItems = [
  //   {url: "/", text: "Home", icon:<Icon name="dashboard" size="2xl" />}
  // ]
  let location = useLocation();

  const [user, setUser] = useState({});

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (userLocal) {
      setUser(userLocal);
      console.log(user.roleId);
      console.log(user);
    }
  }, []);

  const handleCloseSession = () =>{
    localStorage.removeItem("user");
    window.location.replace("login");
  }

  if (
    location.pathname === "/login" ||
    location.pathname === "/home" ||
    location.pathname === "/addClaim" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <a
            href="https://material-tailwind.com?ref=mtd"
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-center w-full inline-block font-sans-serif"
          >
            <h2 className="text-xl font-semibold">Gestor de Reclamos</h2>
          </a>
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              {user?.roleId === 1 ? (
                <>
                  <li className="rounded-lg mb-2 ">
                    <NavLink
                      to="/claims"
                      className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                      activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                    >
                      <HiHome size={24} />
                      Reclamos
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="rounded-lg mb-2 ">
                    <NavLink
                      to="/claims"
                      className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                      activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                    >
                      <HiHome size={24} />
                      Mis Reclamos
                    </NavLink>
                  </li>
                
                </>
              )}

<li className="rounded-lg mb-2 ">
                    <NavLink
                    onClick={ () => handleCloseSession()}
                      className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                      activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                    >
                      <HiUser size={24} />
                      Cerrar sesión
                    </NavLink>
                  </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
