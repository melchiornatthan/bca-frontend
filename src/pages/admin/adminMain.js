import React, { useEffect } from 'react';
import BackLogo from '../assets/Back-Sign.svg';
import bcaLogo from '../assets/white-bca.svg';
import { useState } from 'react';
import ClockOne from '../assets/time-icon/clock1.svg';
import ClockTwo from '../assets/time-icon/clock2.svg';
import ClockThree from '../assets/time-icon/image 11.svg';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import 'typeface-inter';
import CustomProgressBar from '../components/customProgressBar';
import ResponsiveDoughnutChart from '../components/doughnutChart';
function AdminMain() {
    const [providerCount, setProviderCount] = useState([]);
    const [date, setDate] = useState(new Date());
    const [reqCount, setReqCount] = useState([]);
    const [isHoveredThird, setIsHoveredThird] = useState(false);
    const [isHoveredFourth, setIsHoveredFourth] = useState(false);
    const [isHoveredFifth, setIsHoveredFifth] = useState(false);
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = [
        { name: 'Primacom', value: parseInt(providerCount.primacom) },
        { name: 'Tangara', value: parseInt(providerCount.tangara) },
        { name: 'IFORTE', value: parseInt(providerCount.iforte) },
        { name: 'Indonet', value: parseInt(providerCount.indonet)}
      ];

    useEffect(() => {
        getProviderCount();
        getRequestCount();
    }, []);

    const getProviderCount = async () => {
        await axios.get('http://localhost:3333/bca-app/providerCount').
            then((response) => {
                setProviderCount(response.data);
                console.log(response.data)
                setDate(new Date());
            })
            .catch((error) => {
                console.error('Error fetching location data:', error);
            });
    };

    const getRequestCount = async () => {
        await axios.get('http://localhost:3333/bca-app/requestsCount').
            then((response) => {
                setReqCount(response.data);
                console.log(response.data)
                setDate(new Date());
            })
            .catch((error) => {
                console.error('Error fetching location data:', error);
            });
    };

    return (
        <div>

            <nav className="navbar" style={{ backgroundColor: '#1E56A0' }}>
                <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '3vh' }} onClick={() => {
                    localStorage.removeItem('isAuthorized')
                    window.location.href = "/login"
                }} />
                <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }} onClick={() => window.location.href = "/login"} />
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md">
                        <div className="container">
                            <div className="row mx-auto" style={{
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                marginTop: '2vh',
                                border: '2px solid #D6E4F0',
                            }}>

                                <div style={{ height: '40vh' , marginTop:'3vh'}}>
                                <ResponsiveDoughnutChart data={data} />
                                </div>
                                <h1 style={{ textAlign: 'center', fontFamily: 'inter', fontSize: '4vh', color: '#163172', marginTop: '7vh' }}>Provider Count</h1>
                                <h2 style={{ textAlign: 'center', fontFamily: 'inter', fontSize: '2vh', color: '#163172' }}>
                                    Data Update : {date.toDateString()} {date.toLocaleTimeString()}
                                </h2>
                                <div className="row mx-auto centered-row" style={{marginTop:'6vh', marginBottom:'5vh'}}>
                                    <div className="row">
                                    <div className="col-sm">
                                    <p style={{ textAlign: 'center', fontFamily: 'inter', fontSize: '2vh',color: '#163172'}}> Primacom : {providerCount.primacom}/2550 </p>
                                    </div>
                                    <div className='col-lg'>
                                    <CustomProgressBar width={2500 / 2550 * 100} style={{marginTop:'5vh'}} animate={true}/>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-sm">
                                    <p style={{ textAlign: 'center', fontFamily: 'inter', fontSize: '2vh',color: '#163172'}}> Tangara : {providerCount.tangara}/2550 </p>
                                    </div>
                                    <div className='col-lg'>
                                    <CustomProgressBar width={2200 / 2550 * 100} style={{marginTop:'5vh'}} animate={true}/>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-sm">
                                    <p style={{ textAlign: 'center', fontFamily: 'inter', fontSize: '2vh',color: '#163172'}}> Iforte : {providerCount.iforte}/2550 </p>
                                    </div>
                                    <div className='col-lg'>
                                    <CustomProgressBar width={1200 / 2550 * 100} style={{marginTop:'5vh'}} animate={true}/>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-sm">
                                    <p style={{ textAlign: 'center', fontFamily: 'inter', fontSize: '2vh',color: '#163172'}}> Indonet : {providerCount.indonet}/2550 </p>
                                    </div>
                                    <div className='col-lg'>
                                    <CustomProgressBar width={2400 / 2550 * 100} style={{marginTop:'5vh'}} animate={true}/>
                                    </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md text-center mx-3" >
                        <div className="row">
                            <div style={{ background: '#1E56A0', marginTop: '2vh', height: '30vh', paddingTop: '3vh', borderRadius: '5px' }}>
                                <h1 style={{ textAlign: 'center', fontFamily: 'inter', fontSize: '5vh', color: '#F6F6F6', marginTop: '7vh' }}>Provider Count</h1>
                                <h2 style={{ textAlign: 'center', fontFamily: 'inter', fontSize: '2vh', color: '#F6F6F6' }}>
                                    Data Update : {date.toDateString()} {date.toLocaleTimeString()}
                                </h2>
                            </div>

                            <div className="container-fluid text-center mr-3 mt-3 mb-3" style={{
                                backgroundColor: '#D6E4F0',
                                height: '59vh',
                                borderRadius: '5px'
                            }}>

                                <div className='mt-5'>
                                    <h2 style={{ fontFamily: 'inter', color: '#0060AF', fontWeight: 'bold', fontSize: '4vh' }}>
                                        Requests History
                                    </h2>
                                </div>

                                <div className="row mx-auto centered-row"
                                    style={{ marginTop: '10vh' }}
                                >
                                    <div className='col-sm align-items-center justify-content-center'>
                                        <div
                                            style={{
                                                backgroundColor: isHoveredThird ? 'white' : 'transparent',
                                                borderRadius: '5px',

                                                boxShadow: isHoveredThird ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
                                                transition: 'background-color 0.2s, box-shadow 0.2s',
                                                height: '35vh',

                                                position: 'relative', // Set the position to relative
                                            }}
                                            onMouseEnter={() => {
                                                setIsHoveredThird(true);
                                            }}
                                            onMouseLeave={() => {
                                                setIsHoveredThird(false);
                                            }}
                                            onClick={() => window.location.href = `/admin/relocationHistory`}
                                            className='d-flex align-items-center justify-content-center'>
                                            <div className='row'>
                                                <img src={ClockOne} alt="Logo" style={{ height: '5vh' }} />
                                                <div style={{ height: '5vh' }}>
                                                    <h3
                                                        style={{
                                                            marginTop: '5vh',
                                                            visibility: isHoveredThird ? 'visible' : 'hidden', // Show text on hover
                                                            opacity: isHoveredThird ? 1 : 0, // Set opacity on hover
                                                            transition: 'visibility 0s, opacity 0.2s',
                                                        }}
                                                    >
                                                        Relocation
                                                    </h3>
                                                    <h2 style={{ textAlign: 'center', fontFamily: 'inter', color: 'var(--bs-body-bg)', fontSize: '5vh' }}>{reqCount.relocation}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm align-items-center justify-content-center'>
                                        <div
                                            style={{
                                                backgroundColor: isHoveredFourth ? 'white' : 'transparent',
                                                borderRadius: '5px',

                                                boxShadow: isHoveredFourth ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
                                                transition: 'background-color 0.2s, box-shadow 0.2s',
                                                height: '35vh',

                                                position: 'relative', // Set the position to relative
                                            }}
                                            onMouseEnter={() => {
                                                setIsHoveredFourth(true);
                                            }}
                                            onMouseLeave={() => {
                                                setIsHoveredFourth(false);
                                            }}
                                            onClick={() => window.location.href = "/admin/dismantleHistory"}
                                            className='d-flex align-items-center justify-content-center'>
                                            <div className='row'>
                                                <img src={ClockTwo} alt="Logo" style={{ height: '5vh' }} />
                                                <div style={{ height: '5vh' }}>
                                                    <h3
                                                        style={{
                                                            marginTop: '5vh',
                                                            visibility: isHoveredFourth ? 'visible' : 'hidden', // Show text on hover
                                                            opacity: isHoveredFourth ? 1 : 0, // Set opacity on hover
                                                            transition: 'visibility 0s, opacity 0.2s',
                                                        }}
                                                    >
                                                        Dismantle
                                                    </h3>
                                                    <h2 style={{ textAlign: 'center', fontFamily: 'inter', color: 'var(--bs-body-bg)', fontSize: '5vh' }}>{reqCount.dismantle}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm align-items-center justify-content-center'>
                                        <div
                                            style={{
                                                backgroundColor: isHoveredFifth ? 'white' : 'transparent',
                                                borderRadius: '5px',

                                                boxShadow: isHoveredFifth ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
                                                transition: 'background-color 0.2s, box-shadow 0.2s',
                                                height: '35vh',

                                                position: 'relative', // Set the position to relative
                                            }}
                                            onMouseEnter={() => {
                                                setIsHoveredFifth(true);
                                            }}
                                            onMouseLeave={() => {
                                                setIsHoveredFifth(false);
                                            }}
                                            onClick={() => window.location.href = "/admin/installationbatch"}
                                            className='d-flex align-items-center justify-content-center'>
                                            <div className='row'>
                                                <img src={ClockThree} alt="Logo" style={{ height: '5vh' }} />
                                                <div style={{ height: '5vh' }}>
                                                    <h3
                                                        style={{
                                                            marginTop: '5vh',
                                                            visibility: isHoveredFifth ? 'visible' : 'hidden', // Show text on hover
                                                            opacity: isHoveredFifth ? 1 : 0, // Set opacity on hover
                                                            transition: 'visibility 0s, opacity 0.2s',
                                                        }}
                                                    >
                                                        Installation
                                                    </h3>
                                                    <h2 style={{ textAlign: 'center', fontFamily: 'inter', color: 'var(--bs-body-bg)', fontSize: '5vh' }}>{reqCount.installation}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default AdminMain;