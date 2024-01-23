// UserSidebar.js
import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { HiChip, HiOutlineXCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const SidebarAdmin = () => {
  const [showMain, setShowMain] = useState(false);

  const handleCloseMain = () => setShowMain(false);
  const handleShowMain = () => setShowMain(true);


  return (
    <>
      <MdDashboard
        onClick={handleShowMain}
        className="mx-4"
        style={{ color: "#1E56A0", fontSize: "3vh" }}
      />
      <Offcanvas
        show={showMain}
        onHide={handleCloseMain}
        style={{ backgroundColor: "#ffffff", width: "30vh" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <strong style={{ fontSize: "3vh", color: "#000000" }}>
              {" "}
              Memo Application.
            </strong>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {/* Content of the tertiary sidebar goes here */}
          <div className="row">
            <button
              type="button"
              style={{ borderColor: "#FFFFFF" }}
              className="btn text-start btn-outline-success"
              onClick={() =>
                (window.location.href = "/admin/installationBatch")
              }
            >
              <div className="my-1">
                <HiChip />
              </div>
              <strong>Installation History</strong>
            </button>
            <button
              type="button"
              style={{ borderColor: "#FFFFFF" }}
              className="btn text-start btn-outline-warning"
              onClick={() =>
                (window.location.href = "/admin/relocationHistory")
              }
            >
              <div className="my-1">
                <HiChip />
              </div>
              <strong>Relocation History</strong>
            </button>
            <button
              type="button"
              style={{ borderColor: "#FFFFFF" }}
              className="btn text-start btn-outline-danger"
              onClick={() => (window.location.href = "/admin/dismantleHistory")}
            >
              <div className="my-1">
                <HiChip />
              </div>
              <strong>Dismantle History</strong>
            </button>
          </div>
        </Offcanvas.Body>
        <button
          type="button"
          style={{ borderColor: "#FFFFFF" }}
          className="btn mx-1 mb-1 text-start btn-outline-danger"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("username");
            window.location.href = "/login";
          }}
        >
          <div className="my-1 ">
            <HiOutlineXCircle />
          </div>
          <strong> Sign Out</strong>
        </button>
      </Offcanvas>
    </>
  );
};

export default SidebarAdmin;
