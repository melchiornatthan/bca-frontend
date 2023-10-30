import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import BackLogo from '../assets/Back-Sign.svg';
import bcaLogo from '../assets/white-bca.svg';
import axios from 'axios';
import InstallationService from '../components/installationService';

function AdminBatchDetails() {
    const [data, setData] = useState([]);
    const location = useLocation();

    // Parse the URL parameters and extract the 'data' parameter
    const searchParams = new URLSearchParams(location.search);
    const batchid = parseInt(searchParams.get('batchid'), 10);

    useEffect(() => {
        getInstallationData();
    }, [batchid]);

    const getInstallationData = async () => {
        await axios.get('http://localhost:3333/bca-app/getInstallationsbyBatchID/' + batchid + ''
        ).then((response) => {
            setData(response.data);
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
            <div className='py-5 mx-auto text-center'>
            <InstallationService installationData={data} isAdminView={true} />
            </div>

        </div>
    );
}

export default AdminBatchDetails;
