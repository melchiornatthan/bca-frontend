import React from 'react';
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import DismantleDetailsService from '../components/dismantleDetailsService';
import 'typeface-inter';
import OffCanvasSidebar from '../components/sidebar';

function DismantleDetails() {
    const [data, setData] = useState({});
    const location = useLocation();
    // Parse the URL parameters and extract the 'data' parameter
    const searchParams = new URLSearchParams(location.search);
    const int_id = parseInt(searchParams.get('id'), 10);
    const batchid = parseInt(searchParams.get('batchid'), 10);


    useEffect(() => {
        getRelocationData();
        console.log(data);
    }, [int_id]);

    const getRelocationData = async () => {
        await axios.get('http://localhost:3333/bca-app/installationsById/' + int_id + ''
        ).then((response) => {
            setData(response.data[0]);
            console.log(data);
        })
            .catch((error) => {
                console.error('Error fetching location data:', error);
            });
    };

    return (
        <div>
            <nav className="navbar" style={{ backgroundColor: '#1E56A0' }}> 
      <OffCanvasSidebar/>
        <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '4vh' }} onClick={() => window.location.href = "/main"}/>
        <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }}  />
      </nav>
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
                        <li className="breadcrumb-item">
                            <a className="link-body-emphasis fw-semibold text-decoration-none" href={`/dismantleBatch?batchid=${batchid}`} >
                                Batch
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Details
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="text-center mt-5" >
                <h1 style={{ fontFamily: 'inter', color: '#D83F31', fontWeight: 'bold', fontSize: '4vh' }}>Dismantle Request</h1>
            </div>
            <DismantleDetailsService batchdata={data} isAdmin={false} />
        </div>
    );
}

export default DismantleDetails;