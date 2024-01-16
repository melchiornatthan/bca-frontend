import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../axiosConfig";
import RelocationByBatchIdTable from "../components/relocationBatchService";
import "typeface-inter";
import ExcelJS from "exceljs";
import Navbar from "../components/navbar";

function RelocationBatch() {
  const [data, setData] = useState([]);
  const location = useLocation();
  // Parse the URL parameters and extract the 'data' parameter
  const searchParams = new URLSearchParams(location.search);
  const [date, setDate] = useState(new Date());
  const batchid = parseInt(searchParams.get("batchid"), 10);
  const [hasPending, setHasPending] = useState(false);

  useEffect(() => {
    getRelocationData();
    console.log(data);
  }, [batchid]);

  useEffect(() => {
    setHasPending(data.some((entry) => entry.status === "pending"));
  }, [data]);

  const getRelocationData = async () => {
    await axios
      .get(
        "getRelocationsbyBatchID/" + batchid + ""
      )
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error) ;
      });
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

  return (
    <div className="container-fluid pt-3">
      <Navbar/>
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
                href="/relocationHistory"
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
      <div className="text-center mt-5">
        <h1
          style={{
            fontFamily: "inter",
            color: "#E9B824",
            fontWeight: "bold",
            fontSize: "4vh",
          }}
        >
          Relocation Batch
        </h1>
      </div>
      <div>
      <div className="py-5 mx-auto text-center">
         <RelocationByBatchIdTable batchdata={data} isAdmin={false} />
         {!hasPending && (
        <button style={{marginTop:'3vh'}} className="btn btn-primary" onClick={() => exportToJson()}>
          Export to Excel
        </button>
      )}
        </div>
       
      </div>
    </div>
  );
}

export default RelocationBatch;
