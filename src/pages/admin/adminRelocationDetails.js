import React from 'react';
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import RelocationDetailService from '../components/relocationDetailsService';


function AdminRelocationDetails() {
    const [data, setData] = useState({});
    const location = useLocation();
     // Parse the URL parameters and extract the 'data' parameter
     const searchParams = new URLSearchParams(location.search);
     const int_id = parseInt(searchParams.get('id'), 10);

    useEffect(() => {
        getRelocationData();
        console.log(data);
    }, [int_id]);

    const getRelocationData = async () => {
        await axios.get('http://localhost:3333/bca-app/relocations/' + int_id + ''
        ).then((response) => {
            setData(response.data);
            console.log(data);
        })
            .catch((error) => {
                console.error('Error fetching location data:', error);
            });
    };

    const updateRequestStatus = async (id) => {
        // Display a confirmation dialog
        const confirmed = window.confirm('Are you sure you want to approve this request?');

        if (confirmed) {
            const body = {
               installation_id: data.installation_id,
               new_location: data.new_location,
                new_address: data.new_address,
                id: id,
                new_area: data.new_area,
                new_branch_pic: data.new_branch_pic,
                new_communication: data.new_communication,
                new_area_id: data.new_area_id,
            }
            // User clicked "OK" in the confirmation dialog, proceed with the request
            await axios.put(`http://localhost:3333/bca-app/update-relocations/`,body)
                .then((response) => {
                    window.location.href = '/admin/relocationBatch?batchid=' + data.batchid + '';
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
                <h1>Relocation Request</h1>
            </div>
           <RelocationDetailService batchdata={data} isAdmin={true} updateRequestStatus={updateRequestStatus} />
        </div>
    );
}

export default AdminRelocationDetails;