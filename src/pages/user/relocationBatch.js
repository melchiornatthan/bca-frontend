import React from 'react';
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import UneditableInputWithLabel from "../components/uneditableInput";
import RelocationByBatchIdTable from '../components/relocationBatchService';


function RelocationBatch() {
    const [data, setData] = useState([]);
    const location = useLocation();
    // Parse the URL parameters and extract the 'data' parameter
    const searchParams = new URLSearchParams(location.search);
    const batchid = parseInt(searchParams.get('batchid'), 10);

    useEffect(() => {
        getRelocationData();
        console.log(data);
    }, [batchid]);

    const getRelocationData = async () => {
        await axios.get('http://localhost:3333/bca-app/getRelocationsbyBatchID/' + batchid + ''
        ).then((response) => {
            setData(response.data);
            console.log(data);
        })
            .catch((error) => {
                console.error('Error fetching location data:', error);
            });
    };


    return (
        <div>
            <nav className="navbar" style={{ backgroundColor: '#0060AF' }}>
                <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '20px' }} />
                <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }} onClick={() => window.location.href = "/login"} />
            </nav>
            <div className="text-center mt-5" style={{ fontFamily: 'Montserrat' }}>
                <h1>Relocation Request</h1>
            </div>
           <RelocationByBatchIdTable batchdata={data} isAdmin={false} />
        </div>
    );
}

export default RelocationBatch;
