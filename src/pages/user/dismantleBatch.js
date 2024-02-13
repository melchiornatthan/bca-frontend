import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Breadcrumb, Button } from "react-bootstrap";
import { RiHome6Fill } from "react-icons/ri";
import DismantleByBatchIdTable from "../../components/dismantleDetailTable";
import axios from "../../axiosConfig";
import ExcelJS from "exceljs";
import "typeface-inter";
import { useNavigate } from "react-router-dom";
import { getDismantleDataByBatchID } from "../../service/getDismantlebyBatchID";

function DismantleBatch() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [hasPending, setHasPending] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const batchid = parseInt(searchParams.get("batchid"), 10);

  useEffect(() => {
    getDismantleDataByBatchID(batchid, setData);
  }, [batchid]);

  useEffect(() => {
    setHasPending(data.some((entry) => entry.status === "pending"));
  }, [data]);

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
    <Container>
      <Breadcrumb className="breadcrumb-chevron p-3">
        <Breadcrumb.Item>
          <RiHome6Fill onClick={() => navigate("/user")} />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            className="link-body-emphasis fw-semibold text-decoration-none"
            onClick={() => navigate("/user/dismantleHistory")}
          >
            History
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item active aria-current="page">
          Batch
        </Breadcrumb.Item>
      </Breadcrumb>
      <Container className="py-2 mx-auto text-center">
        <DismantleByBatchIdTable batchdata={data} />

        {!hasPending && (
          <Button
            style={{ marginTop: "3vh" }}
            variant="primary"
            onClick={exportToJson}
            className="mx-auto"
          >
            Export to Excel
          </Button>
        )}
      </Container>
    </Container>
  );
}

export default DismantleBatch;
