import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import BackLogo from '../assets/Back-Sign.svg';
import bcaLogo from '../assets/white-bca.svg';
import axios from 'axios';
import RelocationBatchTable from '../components/relocationService';


function AdminRelocationBatch() {
    const [data, setData] = useState([]);


    useEffect(() => {
        getRelocations();
    }, []);

    const getRelocations = async () => {
        await axios.get('http://localhost:3333/bca-app/relocations/')
            .then((response) => {
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
                <h1 style={{ fontFamily: 'Montserrat', color: '#E9B824', fontWeight: 'bold' }}>
                    Relocation Requests
                </h1>
                <RelocationBatchTable batchdata={data} isAdmin={true} />
            </div>

        </div>
    );
}

export default AdminRelocationBatch;
