import bcaLogo from "../../assets/white-bca.svg";
import { TiArrowSortedDown } from "react-icons/ti";
import { Dropdown } from "react-bootstrap";
import { BiSolidHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SidebarOffcanvas from "./sidebarOffcanvas";
const Navbar = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  return (
    <nav
      className="navbar mt-3 px-3 "
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        borderRadius: "1vh",
        alignItems: "center",
      }}
    >
      <div className=" d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none">
        <SidebarOffcanvas />
      </div>
      
      <BiSolidHome  style={{ fontSize: "2vh", color:'#0F4C75' }} onClick={() =>
          isAdmin
            ? navigate("/admin")
            : navigate("/user")
        }/>
      <Dropdown>
        <Dropdown.Toggle
          style={{ backgroundColor: "#FFFFFF", borderRadius:"5vh", borderColor: "#FFFFFF", boxShadow: "0 0 1vh rgba(0, 0, 0, 0.1)"}}
        >
          
          <span style={{
            color: "#1E56A0",
            fontFamily: "inter",
            fontSize: "2vh",
            marginTop: "1vh",
            marginBottom: "1vh",
            marginRight: "1vh",
            marginLeft: "2vh",
          }}>
            Hello, <strong>{username}</strong>
          </span>
          <TiArrowSortedDown
            style={{ fontSize: "1vh", color: "#1E56A0" }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu className="mx-auto" style={{marginTop:"1vh", marginRight:"2vh", borderRadius:"3vh", borderColor:"#FFFFFF",boxShadow: "0 0 1vh rgba(0, 0, 0, 0.1)"}}>
          <button
            type="button"
            style={{ borderColor: "#FFFFFF", width: "80%", marginLeft: "10%" , borderRadius:"3vh"}}
            className="btn btn-outline-danger px-2"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("isAdmin");
              localStorage.removeItem("username");
            navigate("/");
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
