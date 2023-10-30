import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackLogo from '../assets/Back-Sign.svg';
import bcaLogo from '../assets/white-bca.svg';
import SelectInstallation from '../components/installationSelect';


function InstallationSelect() {
    // State variables
    const [installationData, setInstallationData] = useState([]);

    useEffect(() => {
        getInstallationData();
    }, []);
    
    const getInstallationData = async () => {
        await axios.get('http://localhost:3333/bca-app/filtered-installation'
        ).then((response) => {
            setInstallationData(response.data);
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
            <div className="container mt-5">
                <div className="text-center pb-5" style={{ fontFamily: 'Montserrat' }}>
                    <h1 style={{ color: '#219C90', fontWeight: 'bold' }}>Installation Select</h1>
                </div>
                <SelectInstallation installationData={installationData} />
            </div>
        </div>
    );
}

export default InstallationSelect;
