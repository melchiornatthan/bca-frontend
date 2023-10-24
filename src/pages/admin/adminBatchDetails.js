import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import BackLogo from '../assets/Back-Sign.svg';
import bcaLogo from '../assets/white-bca.svg';
import axios from 'axios';
import CustomButton from '../components/button';
import AdminInstallationDetails from '../components/AdminInstallationDetails';


function AdminBatchDetails() {
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
    

    const updateRequestStatus = async (id) => {
        // Display a confirmation dialog
        const confirmed = window.confirm('Are you sure you want to approve this request?');
        
        if (confirmed) {
            // User clicked "OK" in the confirmation dialog, proceed with the request
            await axios.put(`http://localhost:3333/bca-app/update-installations/${id}`)
                .then((response) => {
                    console.log(response);
                    // After updating the status, fetch the data again to update the table
                    getInstallationData();
                })
                .catch((error) => {
                    console.error('Error updating installation data:', error);
                });
        }
    };
    

    return (
        <div>
            <nav className="navbar" style={{ backgroundColor: '#0060AF' }}>
                <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '20px' }} />
                <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }} onClick={() => window.location.href = "/login"} />
            </nav>
            <div className='py-5 mx-auto text-center'>
                <AdminInstallationDetails installationData={data}  updateStatus={updateRequestStatus} />
            </div>

        </div>
    );
}

export default AdminBatchDetails;
