import bcaLogo from "../assets/white-bca.svg";
import { MdAccountCircle } from "react-icons/md";

import UserSidebar from "./sidebarUser";
import SidebarAdmin from "./sidebarAdmin";
const Navbar = () => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
  return (
    <nav
    className="navbar"
    style={{
      backgroundColor: "#FFFFFF",
      display: "flex",
      borderRadius:'1vh',
      alignItems: "center",
    }}
  >
    {
        isAdmin ? <SidebarAdmin /> : <UserSidebar />
    }
    <img
      className="px-3"
      src={bcaLogo}
      alt="Back"
      style={{ height: "6vh" }}
      onClick={() => 
        isAdmin ? window.location.href = "/admin/main" : window.location.href = "/main"}
    />
    <MdAccountCircle
      className="mx-3"
      style={{ fontSize: "3vh", color: "#1E56A0" }}
    />
  </nav>
  );
};

export default Navbar;
