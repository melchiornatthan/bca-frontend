import React, { useEffect } from 'react';
import BackLogo from '../assets/Back-Sign.svg';
import bcaLogo from '../assets/white-bca.svg';
import { useState } from 'react';
import ClockOne from '../assets/time-icon/clock1.svg';
import ClockTwo from '../assets/time-icon/clock2.svg';
import ClockThree from '../assets/time-icon/image 11.svg';
import axios from 'axios';
function AdminMain() {
    const [providerCount, setProviderCount] = useState([]);
    const [date, setDate] = useState(new Date());
    const [reqCount, setReqCount] = useState([]);
    const [isHoveredThird, setIsHoveredThird] = useState(false);
    const [isHoveredFourth, setIsHoveredFourth] = useState(false);
    const [isHoveredFifth, setIsHoveredFifth] = useState(false);

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
        <div style={{ backgroundColor: '#96B6C5' }}>
            <nav className="navbar" style={{ backgroundColor: '#0060AF' }}>
                <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '20px' }} onClick={() => {
                    localStorage.removeItem('isAuthorized')
                    window.location.href = "/login"
                }} />
                <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }} onClick={() => window.location.href = "/login"} />
            </nav>
            <div className="row">
                <div className="col-sm">
                    <div className="container-fluid">
                        <div className="row" style={{ height: '45vh', marginTop: '1vh', marginBottom: '2vh', padding: '2vh' }}>
                            <div className="col-md" style={{ marginRight: '1vh', background: '#0F6292', borderRadius: '2vh', boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)' }}>
                                <h1 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-body-bg)', marginTop: '10vh' }}>Primacom</h1>
                                <h1 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-body-bg)', marginTop: '2vh', fontSize: '10vh' }}>{providerCount.primacom}</h1>
                            </div>
                            <div className="col-md" style={{ background: '#F94C10', borderRadius: '2vh', marginLeft: '2vh', boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)' }}>
                                <h1 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-body-bg)', marginTop: '10vh' }}>Tangara</h1>
                                <h2 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-body-bg)', marginTop: '2vh', fontSize: '10vh' }}>{providerCount.tangara}</h2>
                            </div>
                        </div>
                        <div className="row" style={{ height: '45vh', marginTop: '2vh', marginBottom: '2vh', padding: '2vh' }}>
                            <div className="col-md" style={{ marginRight: '1vh', background: '#004225', borderRadius: '2vh', boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)' }}>
                                <h1 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-body-bg)', marginTop: '10vh' }}>IForte</h1>
                                <h2 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-body-bg)', marginTop: '2vh', fontSize: '10vh' }}>{providerCount.iforte}</h2>
                            </div>
                            <div className="col-md" style={{ background: '#FFD93D', borderRadius: '2vh', marginLeft: '2vh', boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)' }}>
                                <h1 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-emphasis-color)', marginTop: '10vh' }}>Indonet</h1>
                                <h2 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-body-bg)', marginTop: '2vh', fontSize: '10vh' }}>{providerCount.indonet}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg text-center px-5" >
                    <div className="row">
                        <div style={{ background: '#FFFFFF', marginTop: '2vh', height: '30vh', paddingTop: '3vh', borderRadius: '2vh', boxShadow: '10px 10px 20px rgba(33, 156, 144, 0.3)' }} className='mx-2'>
                            <h1 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-emphasis-color)', fontSize: '8vh', }}>Provider Count</h1>
                            <h2 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-emphasis-color)', fontSize: '5vh' }}>
                                Data Update : {date.toDateString()} {date.toLocaleTimeString()}
                            </h2>
                        </div>

                        <div className="container-fluid text-center mr-3 mt-3 mb-3" style={{
                            backgroundColor: '#ADC4CE', 
                            height: '60vh',
                            borderRadius: '2vh'
                        }}>

                            <div className='mt-5'>
                                <h2 style={{ fontFamily: 'Montserrat', color: '#FFFFFF', fontWeight: 'bold', fontSize: '4vh' }}>
                                    Requests History
                                </h2>
                            </div>

                            <div className="row mx-auto centered-row mt-5">
                                <div className='col-sm align-items-center justify-content-center'>
                                    <div
                                        style={{
                                            backgroundColor: isHoveredThird ? 'white' : 'transparent',
                                            borderRadius: '33px',
                                            padding: '20px',
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
                                                <h2 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-body-bg)', fontSize: '5vh' }}>{reqCount.relocation}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm align-items-center justify-content-center'>
                                    <div
                                        style={{
                                            backgroundColor: isHoveredFourth ? 'white' : 'transparent',
                                            borderRadius: '33px',
                                            padding: '20px',
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
                                        onClick={() => window.location.href = "/admin/dismantlebatch"}
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
                                                <h2 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-body-bg)', fontSize: '5vh' }}>{reqCount.dismantle}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm align-items-center justify-content-center'>
                                    <div
                                        style={{
                                            backgroundColor: isHoveredFifth ? 'white' : 'transparent',
                                            borderRadius: '33px',
                                            padding: '20px',
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
                                                <h2 style={{ textAlign: 'center', fontFamily: 'montserrat', color: 'var(--bs-body-bg)', fontSize: '5vh' }}>{reqCount.installation}</h2>
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