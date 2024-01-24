import bcaLogo from "../assets/white-bca.svg";
import { MdAccountCircle } from "react-icons/md";
import { Dropdown } from "react-bootstrap";
import UserSidebar from "./sidebarUser";
import SidebarAdmin from "./sidebarAdmin";
const Navbar = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
 
  return (
    <nav
      className="navbar mt-2"
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        borderRadius: "1vh",
        alignItems: "center",
      }}
    >
      {isAdmin ? <SidebarAdmin /> : <UserSidebar />}
      <img
        className="px-3"
        src={bcaLogo}
        alt="Back"
        style={{ height: "5vh" }}
        onClick={() =>
          isAdmin
            ? (window.location.href = "/admin/main")
            : (window.location.href = "/main")
        }
      />
      <Dropdown>
        <Dropdown.Toggle
          id="account-dropdown"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#FFFFFF" }}
        >
          <MdAccountCircle
            className="mx-3"
            style={{ fontSize: "3vh", color: "#1E56A0" }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu style={{marginTop:"1vh", marginRight:"2vh"}}>
          <button
            type="button"
            style={{ borderColor: "#FFFFFF", width: "80%", marginLeft: "10%" }}
            className="btn btn-outline-danger"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("isAdmin");
              localStorage.removeItem("username");
              window.location.href = "/login";
            }}
          >
            <strong> Logout</strong>
          </button>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
};

export default Navbar;
