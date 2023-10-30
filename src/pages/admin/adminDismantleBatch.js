import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import BackLogo from '../assets/Back-Sign.svg';
import bcaLogo from '../assets/white-bca.svg';
import axios from 'axios';
import AdminDismantleTable from '../components/adminDismantleTable';



function AdminDismantleBatch() {
    const [data, setData] = useState([]);
    

    useEffect(() => {
        getRelocations();
    }, []);

    const getRelocations = async () => {
        await axios.get('http://localhost:3333/bca-app/dismantles')
        .then((response) => {
            setData(response.data);
            console.log(response.data);
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
               <AdminDismantleTable batchdata={data}/>
            </div>
           
        </div>
    );
}

export default AdminDismantleBatch;
