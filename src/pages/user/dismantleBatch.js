import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../axiosConfig";
import ExcelJS from "exceljs";
import DismantleByBatchIdTable from "../components/dismantleBatchService";
import "typeface-inter";
import UserNavbar from "../components/userNavbar";

function DismantleBatch() {
  // State to hold the data retrieved from the API
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const token = localStorage.getItem("token");
  const [hasPending, setHasPending] = useState(false);
  const location = useLocation();

  // Parse the URL parameters and extract the 'batchid' parameter
  const searchParams = new URLSearchParams(location.search);
  const batchid = parseInt(searchParams.get("batchid"), 10);

  // Fetch data from the API when the component mounts or when batchid changes
  useEffect(() => {
    getDismantleData();
  }, [batchid]);

  useEffect(() => {
    setHasPending(data.some((entry) => entry.status === "pending"));
  }, [data]);

  // Function to fetch dismantle data based on batchid
  const getDismantleData = async () => {
    try {
      const response = await axios.get(`getDismantlebyBatchID/${batchid}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching dismantle data:", error);
      // Handle error gracefully, show a user-friendly message, or redirect if necessary
    }
  };

  const exportToJson = async () => {
    setDate(new Date());
    const keysToExclude = [
      "old_area_id",
      "new_area_id",
      "status",
      "installation_id",
      "createdAt",
      "updatedAt",
    ];
    const headers = Object.keys(data[0]).filter(
      (key) => !keysToExclude.includes(key)
    );
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");
    const arrayOfArrays = [
      headers, // First row contains headers
      ...data.map((obj) => headers.map((key) => obj[key])),
    ];

    worksheet.mergeCells("A1", "H3");
    worksheet.getCell("A1").value = "PERMOHONAN RELOKASI ATM";
    worksheet.getCell("A1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getCell("A1").font = { bold: true };

    // Use the 'id-ID' locale option to display the date in Indonesian format
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
      localeMatcher: "best fit",
    };
    const formattedDate = date.toLocaleDateString("id-ID", dateOptions);

    worksheet.mergeCells("A4", "B5");
    worksheet.getCell("A4").value = `Tanggal Permohonan : ${formattedDate}`;
    worksheet.getCell("A4").font = { bold: true };
    worksheet.getCell("A4").alignment = {
      horizontal: "left",
      vertical: "middle",
    };

    arrayOfArrays.forEach((row) => {
      const excelRow = worksheet.addRow(row);
      excelRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Generate a blob from the Excel workbook
    worksheet.getColumn(1).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getColumn(2).width = 40;
    worksheet.getColumn(3).width = 40;
    worksheet.getColumn(4).width = 40;
    worksheet.getColumn(5).width = 40;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 20;
    worksheet.getColumn(9).width = 20;
    worksheet.getColumn(10).width = 20;
    worksheet.getColumn(11).width = 20;
    worksheet.getColumn(12).width = 20;

    const blob = await workbook.xlsx.writeBuffer();

    // Create a blob URL for the Excel file
    const blobUrl = window.URL.createObjectURL(
      new Blob([blob], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );

    // Create a download link
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "ATM Memo Instalasi.xlsx";
    link.click();

    // Revoke the blob URL to release resources
    window.URL.revokeObjectURL(blobUrl);
  };

  // JSX rendering
  return (
    <div className="container-fluid pt-3">
      {/* Breadcrumb navigation */}
      <UserNavbar />
      <div className="container my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3">
            <li className="breadcrumb-item">
              <a className="link-body-emphasis" href="/main">
                Main
              </a>
            </li>
            <li className="breadcrumb-item">
              <a
                className="link-body-emphasis fw-semibold text-decoration-none"
                href="/dismantleHistory"
              >
                History
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Batch
            </li>
          </ol>
        </nav>
      </div>

      {/* Title */}
      <div className="text-center mt-5">
        <h1
          style={{
            fontFamily: "inter",
            color: "#D83F31",
            fontWeight: "bold",
            fontSize: "4vh",
          }}
        >
          Dismantle Batch
        </h1>
      </div>
      <div className="py-5 mx-auto text-center">
        {/* DismantleByBatchIdTable component */}
        <DismantleByBatchIdTable batchdata={data} isAdmin={false} />

        {!hasPending && (
        <button
          style={{ marginTop: "3vh" }}
          className="btn btn-primary"
          onClick={() => exportToJson()}
        >
          Export to Excel
        </button>
      )}
      </div>
    </div>
  );
}

export default DismantleBatch;
