// UserSidebar.js
import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { HiOutlineXCircle } from "react-icons/hi";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { MdHomeRepairService } from "react-icons/md";
import { MdOutlineTimelapse } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { TbArrowsMove } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";

const UserSidebar = () => {
  const [showMain, setShowMain] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [showTertiary, setShowTertiary] = useState(false);

  const handleCloseMain = () => setShowMain(false);
  const handleShowMain = () => setShowMain(true);

  const handleCloseSecondary = () => setShowSecondary(false);
  const handleShowSecondary = () => setShowSecondary(true);

  const handleCloseTertiary = () => setShowTertiary(false);
  const handleShowTertiary = () => setShowTertiary(true);

  return (
    <>
      <BsLayoutSidebarInset
        onClick={handleShowMain}
        className="mx-4"
        style={{ color: "#1E56A0", fontSize: "3vh" }}
      />

      <Offcanvas
        show={showMain}
        onHide={handleCloseMain}
        style={{ backgroundColor: "#ffffff", width: "25vh" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <strong style={{ fontSize: "3vh", color: "#0B2447" }}>
              {" "}
              Memo Application.
            </strong>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className="row">
            <button
              type="button"
              style={{ borderColor: "#FFFFFF" }}
              className="btn text-start btn-outline-primary"
              onClick={handleShowSecondary}
            >
              <div className="my-1">
                <MdHomeRepairService />
              </div>
              <strong> Request Service</strong>
            </button>
            <button
              type="button"
              style={{ borderColor: "#FFFFFF" }}
              className="btn text-start btn-outline-warning"
              onClick={handleShowTertiary}
            >
              <div className="my-1">
                <MdOutlineTimelapse />
              </div>
              <strong> Service History</strong>
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

      <Offcanvas
        show={showSecondary}
        onHide={handleCloseSecondary}
        style={{ backgroundColor: "#ffffff", width: "25vh" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <strong style={{ fontSize: "3vh", color: "#0B2447" }}>
              Request Service
            </strong>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {/* Content of the secondary sidebar goes here */}
          <div className="row">
            <button
              type="button"
              style={{ borderColor: "#FFFFFF" }}
              className="btn text-start btn-outline-success"
              onClick={() => (window.location.href = "/installationRequest")}
            >
              <div className="my-1">
                <MdAddBox />
              </div>
              <strong>Installation Request</strong>
            </button>
            <button
              type="button"
              style={{ borderColor: "#FFFFFF" }}
              className="btn text-start btn-outline-warning"
              onClick={() => (window.location.href = "/relocationRequest")}
            >
              <div className="my-1">
                <TbArrowsMove />
              </div>
              <strong>Relocation Request</strong>
            </button>
            <button
              type="button"
              style={{ borderColor: "#FFFFFF" }}
              className="btn text-start btn-outline-danger"
              onClick={() => (window.location.href = "/dismantleRequest")}
            >
              <div className="my-1">
                <MdOutlineDelete />
              </div>
              <strong>Dismantle Request</strong>
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas
        show={showTertiary}
        onHide={handleCloseTertiary}
        style={{ backgroundColor: "#ffffff", width: "25vh" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <strong style={{ fontSize: "3vh", color: "#0B2447" }}>
              Service History
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
              onClick={() => (window.location.href = "/installationBatch")}
            >
              <div className="my-1">
                <MdOutlineTimelapse />
              </div>
              <strong>Installation History</strong>
            </button>
            <button
              type="button"
              style={{ borderColor: "#FFFFFF" }}
              className="btn text-start btn-outline-warning"
              onClick={() => (window.location.href = "/relocationHistory")}
            >
              <div className="my-1">
                <MdOutlineTimelapse />
              </div>
              <strong>Relocation History</strong>
            </button>
            <button
              type="button"
              style={{ borderColor: "#FFFFFF" }}
              className="btn text-start btn-outline-danger"
              onClick={() => (window.location.href = "/dismantleHistory")}
            >
              <div className="my-1">
                <MdOutlineTimelapse />
              </div>
              <strong>Dismantle History</strong>
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserSidebar;
