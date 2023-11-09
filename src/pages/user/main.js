import React, { useEffect } from 'react';
import BackLogo from '../assets/Back-Sign.svg';
import installationLogo from '../assets/installation-logo.svg';
import bcaLogo from '../assets/white-bca.svg';
import IntText from '../assets/installation-text.svg';
import { useState } from 'react';
import RnD from '../assets/RND-Text.svg';
import ClockOne from '../assets/time-icon/clock1.svg';
import ClockTwo from '../assets/time-icon/clock2.svg';
import ClockThree from '../assets/time-icon/image 11.svg';
import RnDLogo from '../assets/rnd-logo.svg';
import axios from 'axios';
function Main() {
  const [isHoveredFirst, setIsHoveredFirst] = useState(false);
  const [isHoveredSecond, setIsHoveredSecond] = useState(false);
  const [reqCount, setReqCount] = useState([]);
  const [isHoveredThird, setIsHoveredThird] = useState(false);
  const [isHoveredFourth, setIsHoveredFourth] = useState(false);
  const [isHoveredFifth, setIsHoveredFifth] = useState(false);

  useEffect(() => {
    getRequestCount();
   }, []);

  const getRequestCount = async () => {
    await axios.get('http://localhost:3333/bca-app/requestsCount').
        then((response) => {
            setReqCount(response.data);
            console.log(response.data)
            
        })
        .catch((error) => {
            console.error('Error fetching location data:', error);
        });
};

  return (
    <div >
      <nav className="navbar" style={{ backgroundColor: '#0060AF' }}>
        <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '20px' }} onClick={() => {
          localStorage.removeItem('isAuthorized')
          window.location.href = "/login"
        }} />
        <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }} onClick={() => window.location.href = "/login"} />
      </nav>
      <div className="container-fluid text-center" style={{
        height: '25vh',
      }}>
        <div className='container mt-3' style={{
          backgroundColor: '#96B6C5',
          borderRadius: '20px',
          paddingTop: '10vh',
          height: '25vh',
          boxShadow: '10px 10px 20px rgba(190, 190,190, 0.3)'
        }} // Change background color on hover
        >
          <h1 style={{ fontFamily: 'Montserrat', color: '#FFFFFF', fontWeight: 'bold' }}>
            Welcome to Memo Hub
          </h1>
        </div>
      </div>
      <div className="container-fluid text-center " style={{
        height: '35vh',
        marginTop: '10vh',
        marginBottom: '10vh',
      }}>
        <div className="row w-75 mx-auto centered-row">
          <div className='col-lg'>
            <div
              style={{
                backgroundColor: 'white', // Change background color on hover
                borderRadius: '33px',
                padding: '20px',
                boxShadow: isHoveredFirst ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
                transition: 'box-shadow 0.3s',
                height: '300px',
                border: '3px solid #219C90',
              }}
              onMouseEnter={() => {
                setIsHoveredFirst(true);
              }}
              onMouseLeave={() => {
                setIsHoveredFirst(false);
              }}
              onClick={() => window.location.href = "/installationrequest"}
              className='align-items-center justify-content-center'>
              <img src={installationLogo} alt="Logo" style={{ height: '75px',marginTop:'8vh'}} />
              <h2 style={{ marginTop:'3vh', textAlign: 'center', fontFamily: 'montserrat', color: '#219C90', fontSize: '5vh' , fontWeight: 'bold'}}>
                Installation
            </h2>
            </div>
          </div>
          <div className='col-lg align-items-center justify-content-center'>
            <div
              style={{
                backgroundColor: 'white', // Change background color on hover
                borderRadius: '33px',
                padding: '20px',
                boxShadow: isHoveredSecond ? '10px 10px 20px rgba(233, 184, 36, 0.3)' : 'none',
                transition: 'box-shadow 0.3s',
                height: '300px',
                border: '3px solid #E9B824',
              }}
              onMouseEnter={() => {
                setIsHoveredSecond(true);

              }}
              onMouseLeave={() => {
                setIsHoveredSecond(false);

              }}
              onClick={() => window.location.href = "/installationselect"}
              className='align-items-center justify-content-center'>
              <img src={RnDLogo} alt="Logo" style={{ height: '75px', marginTop:'8vh'}} />
              <h2 style={{ marginTop:'3vh', textAlign: 'center', fontFamily: 'montserrat', color: '#D83F31', fontSize: '5vh' , fontWeight: 'bold'}}>
                Relocation and Dismantle
            </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center my-5" style={{
        backgroundColor: '#96B6C5',
        borderRadius: '17px',
        boxShadow: '10px 10px 20px rgba(190, 190,190, 0.3)'
      }}>
        <div className='py-5'>
          <h2 style={{ fontFamily: 'Montserrat', color: '#FFFFFF', fontWeight: 'bold', fontSize: '7vh' }}>
            Requests History
          </h2>
        </div>

        <div className="row mx-auto centered-row py-5">
                    <div className='col-sm align-items-center justify-content-center'>
                        <div
                            style={{
                                backgroundColor: isHoveredThird ? 'white' : 'transparent',
                                borderRadius: '33px',
                                padding: '20px',
                                boxShadow: isHoveredThird ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
                                transition: 'background-color 0.2s, box-shadow 0.2s',
                                height: '40vh',

                                position: 'relative', // Set the position to relative
                            }}
                            onMouseEnter={() => {
                                setIsHoveredThird(true);
                            }}
                            onMouseLeave={() => {
                                setIsHoveredThird(false);
                            }}
                            onClick={() => window.location.href = `relocationHistory`}
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
                                height: '40vh',
                                position: 'relative', // Set the position to relative
                            }}
                            onMouseEnter={() => {
                                setIsHoveredFourth(true);
                            }}
                            onMouseLeave={() => {
                                setIsHoveredFourth(false);
                            }}
                            onClick={() => window.location.href = "dismantlebatch"}
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
                                height: '40vh',
                                position: 'relative', // Set the position to relative
                            }}
                            onMouseEnter={() => {
                                setIsHoveredFifth(true);
                            }}
                            onMouseLeave={() => {
                                setIsHoveredFifth(false);
                            }}
                            onClick={() => window.location.href = "installationbatch"}
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
  );
}

export default Main;