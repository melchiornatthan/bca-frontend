import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import BackLogo from '../assets/Back-Sign.svg';
import bcaLogo from '../assets/white-bca.svg';
import axios from 'axios';
import InstallationService from '../components/installationService';
import ExcelJS from 'exceljs'; 


function BatchDetails() {
  const [data, setData] = useState([]);
  // const [batchId, setBatchId] = useState('200000001');
  const location = useLocation();

  // Parse the URL parameters and extract the 'data' parameter
  const searchParams = new URLSearchParams(location.search);
  const batchid = parseInt(searchParams.get('batchid'), 10);

  useEffect(() => {
    getInstallationData();
  }, []);

  const getInstallationData = async () => {
    const body = {
      batchid: batchid
    };
    await axios.get('http://localhost:3333/bca-app/getInstallationsbyBatchID/' + batchid + ''
    ).then((response) => {
      setData(response.data);
    })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  };

  const exportToJson = async () => {
    const keysToExclude = ['relocation_status', 'dismantle_status','provider','price', 'provider_id', 'price_id', 'area_id', 'days'];
    const headers = Object.keys(data[0]).filter(key => !keysToExclude.includes(key));
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    const arrayOfArrays = [
      headers, // First row contains headers
      ...data.map(obj => headers.map(key => obj[key])),
    ];
    arrayOfArrays.forEach((row) => {
      worksheet.addRow(row);
    });
    // Generate a blob from the Excel workbook
    const blob = await workbook.xlsx.writeBuffer();

    // Create a blob URL for the Excel file
    const blobUrl = window.URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));

    // Create a download link
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'data.xlsx';
    link.click();

    // Revoke the blob URL to release resources
    window.URL.revokeObjectURL(blobUrl);
  };


  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#0060AF' }}>
        <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '20px' }} />
        <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }} onClick={() => window.location.href = "/login"} />
      </nav>
      <div className='py-5 mx-auto text-center'>
        <InstallationService installationData={data} />
        <button className="btn btn-primary"  onClick={() => exportToJson()}>Export to Excel</button>
      </div>
    </div>
  );
}

export default BatchDetails;
