import React from 'react';
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import DismantleDetailsService from '../components/dismantleDetailsService';


function AdminDismantleDetails() {
    const [data, setData] = useState({});
    const location = useLocation();
     // Parse the URL parameters and extract the 'data' parameter
     const searchParams = new URLSearchParams(location.search);
     const int_id = parseInt(searchParams.get('id'), 10);
     const dismantle_id = parseInt(searchParams.get('dismantle_id'), 10);
     const batchid = parseInt(searchParams.get('batchid'), 10);

    useEffect(() => {
        getRelocationData();
    }, [int_id]);

    const getRelocationData = async () => {
        await axios.get('http://localhost:3333/bca-app/installationsById/' + int_id + ''
        ).then((response) => {
            setData(response.data[0]);
        })
            .catch((error) => {
                console.error('Error fetching location data:', error);
            });
    };


    const updateRequestStatus = async () => {
        // Display a confirmation dialog
        const confirmed = window.confirm('Are you sure you want to approve this request?');

        if (confirmed) {
            const body = { 
                id: dismantle_id,
                installation_id: data.id
            }
            // User clicked "OK" in the confirmation dialog, proceed with the request
            await axios.put(`http://localhost:3333/bca-app/update-dismantle/`,body)
                .then((response) => {
                     window.location.href = '/admin/dismantleBatch?batchid=' + batchid + '';
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
            <div className="text-center mt-5" style={{ fontFamily: 'Montserrat' }}>
                <h1>Dismantle Request</h1>
            </div>
           <DismantleDetailsService batchdata={data} isAdmin={true} updateRequestStatus={updateRequestStatus}/>
        </div>
    );
}

export default AdminDismantleDetails;