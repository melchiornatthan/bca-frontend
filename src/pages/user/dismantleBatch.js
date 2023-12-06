import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BackLogo from '../assets/Back-Sign.svg';
import bcaLogo from '../assets/white-bca.svg';
import DismantleByBatchIdTable from '../components/dismantleBatchService';
import 'typeface-inter';
function DismantleBatch() {
  // State to hold the data retrieved from the API
  const [data, setData] = useState([]);

  // Get the current URL location
  const location = useLocation();

  // Parse the URL parameters and extract the 'batchid' parameter
  const searchParams = new URLSearchParams(location.search);
  const batchid = parseInt(searchParams.get('batchid'), 10);

  // Fetch data from the API when the component mounts or when batchid changes
  useEffect(() => {
    getDismantleData();
  }, [batchid]);

  // Function to fetch dismantle data based on batchid
  const getDismantleData = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/bca-app/getDismantlebyBatchID/${batchid}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching dismantle data:', error);
      // Handle error gracefully, show a user-friendly message, or redirect if necessary
    }
  };

  // JSX rendering
  return (
    <div>

      {/* Breadcrumb navigation */}
      <div className="container my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3">
            <li className="breadcrumb-item">
              <a className="link-body-emphasis" href="/main">
                Main
              </a>
            </li>
            <li className="breadcrumb-item">
              <a className="link-body-emphasis fw-semibold text-decoration-none" href="/dismantleHistory">
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
        <h1 style={{ fontFamily: 'inter', color: '#D83F31', fontWeight: 'bold', fontSize: '4vh' }}>
          Dismantle Batch {batchid}
        </h1>
      </div>

      {/* DismantleByBatchIdTable component */}
      <DismantleByBatchIdTable batchdata={data} isAdmin={false} />
    </div>
  );
}

export default DismantleBatch;
