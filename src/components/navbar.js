import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { Dropdown } from "react-bootstrap";
import { BiSolidHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SidebarOffcanvas from "./sidebarOffcanvas";

/**
 * Navbar component renders the navigation bar with home icon, user dropdown, and logout option.
 * @returns {JSX.Element} - Navigation bar component.
 */
const Navbar = () => {
  // Check if user is an admin
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  // Get username from local storage
  const username = localStorage.getItem("username");
  // Hook for navigation to different routes
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
      {/* Render sidebar offcanvas component for smaller screen sizes */}
      <div className=" d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none">
        <SidebarOffcanvas />
      </div>
      
      {/* Render home icon with navigation logic */}
      <BiSolidHome  
        style={{ fontSize: "2vh", color:'#0F4C75' }} 
        onClick={() =>
          isAdmin
            ? navigate("/admin")
            : navigate("/user")
        }
      />
      {/* Render dropdown menu for user */}
      <Dropdown>
        {/* Render dropdown toggle */}
        <Dropdown.Toggle
          style={{ backgroundColor: "#FFFFFF", borderRadius:"5vh", borderColor: "#FFFFFF", boxShadow: "0 0 1vh rgba(0, 0, 0, 0.1)"}}
        >
          {/* Render username with arrow icon */}
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
        {/* Render dropdown menu */}
        <Dropdown.Menu className="mx-auto" style={{marginTop:"1vh", marginRight:"2vh", borderRadius:"3vh", borderColor:"#FFFFFF",boxShadow: "0 0 1vh rgba(0, 0, 0, 0.1)"}}>
          {/* Render logout button */}
          <button
            type="button"
            style={{ borderColor: "#FFFFFF", width: "80%", marginLeft: "10%" , borderRadius:"3vh"}}
            className="btn btn-outline-danger px-2"
            onClick={() => {
              // Clear user data from local storage and navigate to login page
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

export default Navbar; // Export the Navbar component for use in other files
