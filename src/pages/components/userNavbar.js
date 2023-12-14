import UserSidebar from "../components/sidebarUser";
import bcaLogo from "../assets/white-bca.svg";
import { MdAccountCircle } from "react-icons/md";
const UserNavbar = () => {

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
    <UserSidebar />
    <img
      className="px-3"
      src={bcaLogo}
      alt="Back"
      style={{ height: "6vh" }}
      onClick={() => (window.location.href = "main")}
    />
    <MdAccountCircle
      className="mx-3"
      style={{ fontSize: "3vh", color: "#1E56A0" }}
    />
  </nav>
  );
};

export default UserNavbar;
