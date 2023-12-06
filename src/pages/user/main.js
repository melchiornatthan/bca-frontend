import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'typeface-inter';
import axios from 'axios';
import BackLogo from '../assets/Back-Sign.svg';
import installationLogo from '../assets/installation-logo.svg';
import bcaLogo from '../assets/white-bca.svg';
import DismantleLogo from '../assets/image 8.svg';
import RnDLogo from '../assets/rnd-logo.svg';
import ClockOne from '../assets/time-icon/clock1.svg';
import ClockTwo from '../assets/time-icon/clock2.svg';
import ClockThree from '../assets/time-icon/image 11.svg';
import ResponsiveDoughnutChart from '../components/doughnutChart';


function Main() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [isHoveredFirst, setIsHoveredFirst] = useState(false);
  const [isHoveredSecond, setIsHoveredSecond] = useState(false);
  const [isHoveredThird, setIsHoveredThird] = useState(false);
  const [isHoveredFourth, setIsHoveredFourth] = useState(false);
  const [isHoveredFifth, setIsHoveredFifth] = useState(false);
  const [isHoveredSixth, setIsHoveredSixth] = useState(false);
  const [providerCount, setProviderCount] = useState([]);
  const [reqCount, setReqCount] = useState([]);
  const [date, setDate] = useState(new Date());
  const data = [
    { name: 'Primacom', value: parseInt(providerCount.primacom) },
    { name: 'Tangara', value: parseInt(providerCount.tangara) },
    { name: 'IFORTE', value: parseInt(providerCount.iforte) },
    { name: 'Indonet', value: parseInt(providerCount.indonet)}
  ];
  

  useEffect(() => {
    getRequestCount();
    getProviderCount();
  }, []);

  const getRequestCount = async () => {
    try {
      const response = await axios.get('http://localhost:3333/bca-app/requestsCount');
      setReqCount(response.data);
      console.log('Request Count:', response.data);
    } catch (error) {
      console.error('Error fetching request counts:', error.message);
    }
  };

  const getProviderCount = async () => {
    await axios.get('http://localhost:3333/bca-app/providerCount')
      .then((response) => {
        setProviderCount(response.data);
        console.log(response)
        setDate(new Date());
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthorized');
    window.location.href = '/login';
  };

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#1E56A0' }}>
        <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '4vh' }} onClick={() => handleLogout()} />
        <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }} onClick={() => window.location.href = "/login"} />
      </nav>
      <div className="container-fluid text-center">
        <div className='row mx-auto'>
          <div className='col-md'>
            <div className="row">
              <div className='container mx-auto mt-3' style={{
                backgroundColor: '#D6E4F0',
                borderRadius: '3px',
                paddingTop: '5vh',
                height: '13vh',
              }}>
                <h1 style={{ fontFamily: 'Inter', color: '#1E56A0', fontSize: '3vh' }}>
                  Welcome to Memo Hub
                </h1>
              </div>
              <div className="container mx-auto" style={{
                marginTop: '3vh',
              }}>
                <div className="row mx-auto centered-row">
                  <div className='col-sm align-items-center justify-content-center'>
                    <div
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '20px',
                        boxShadow: isHoveredSixth ? '5px 5px 5px rgba(216, 63, 49, 0.3)' : 'none',
                        transition: 'box-shadow 0.3s',
                        height: '25vh',
                        border: '2px solid #D83F31',
                      }}
                      onMouseEnter={() => setIsHoveredSixth(true)}
                      onMouseLeave={() => setIsHoveredSixth(false)}
                      onClick={() => window.location.href = "/dismantleRequest"}
                      className='align-items-center my-1 justify-content-center'>
                      <img src={DismantleLogo} alt="Logo" style={{ height: '5vh', marginTop: '5vh' }} />
                      <h2 style={{ marginTop: '3vh', textAlign: 'center', fontFamily: 'inter', color: '#D83F31', fontSize: '2vh' }}>
                        Dismantle
                      </h2>
                    </div>
                  </div>
                  <div className='col-sm'>
                    <div
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '20px',
                        boxShadow: isHoveredSecond ? '5px 5px 5px rgba(233, 184, 36, 0.3)' : 'none',
                        transition: 'box-shadow 0.3s',
                        height: '25vh',
                        border: '2px solid #E9B824',
                      }}
                      onMouseEnter={() => setIsHoveredSecond(true)}
                      onMouseLeave={() => setIsHoveredSecond(false)}
                      onClick={() => window.location.href = "/relocationRequest"}
                      className='align-items-center my-1 justify-content-center'>
                      <img src={RnDLogo} alt="Logo" style={{ height: '5vh', marginTop: '5vh' }} />
                      <h2 style={{ marginTop: '3vh', textAlign: 'center', fontFamily: 'inter', color: '#E9B824', fontSize: '2vh' }}>
                        Relocation
                      </h2>
                    </div>
                  </div>

                  <div className='col-sm'>
                    <div
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '20px',
                        boxShadow: isHoveredFirst ? '5px 5px 5px rgba(33, 156, 144, 0.3)' : 'none',
                        transition: 'box-shadow 0.3s',
                        height: '25vh',
                        border: '2px solid #219C90',
                      }}
                      onMouseEnter={() => setIsHoveredFirst(true)}
                      onMouseLeave={() => setIsHoveredFirst(false)}
                      onClick={() => window.location.href = "/installationrequest"}
                      className='align-items-center my-1 justify-content-center'>
                      <img src={installationLogo} alt="Logo" style={{ height: '5vh', marginTop: '5vh' }} />
                      <h2 style={{ marginTop: '3vh', textAlign: 'center', fontFamily: 'inter', color: '#219C90', fontSize: '2vh' }}>
                        Installation
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container" style={{
                backgroundColor: 'white',
                borderRadius: '1px',
                border: '2px solid #D6E4F0',
                marginTop: '3vh',
              }}>
                <div className="row mx-auto centered-row">
                  <div className='col-md'>
                    <div style={{ height: '40vh', marginTop: '3vh' }}>
                      {/* <Doughnut data={data} className='mx-auto' />  */}
                      <ResponsiveDoughnutChart data={data} />
                    </div>
                  </div>
                  <div className='col-md px-1'>
                    <h1 style={{ textAlign: 'center', fontFamily: 'inter', fontSize: '4vh', color: '#163172', marginTop: '4vh' }}>Provider Count</h1>
                    <h2 style={{ textAlign: 'center', fontFamily: 'inter', fontSize: '2vh', color: '#163172' }}>
                      Data Update : {date.toDateString()} {date.toLocaleTimeString()}
                    </h2>
                    <p style={{ textAlign: 'center', fontFamily: 'inter', color: '#163172' , marginTop:'5vh'}}> Primacom : {providerCount.primacom}/2550 </p>
                    <p style={{ textAlign: 'center', fontFamily: 'inter', color: '#163172' }}> Iforte : {providerCount.iforte}/2550 </p>
                    <p style={{ textAlign: 'center', fontFamily: 'inter', color: '#163172' }}> Tangara : {providerCount.tangara}/2550 </p>
                    <p style={{ textAlign: 'center', fontFamily: 'inter', color: '#163172' }}> Indonet : {providerCount.indonet}/2550 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md'>
            <div className="container-fluid text-center my-3" style={{
              backgroundColor: 'white',
              borderRadius: '1px',
              height: '90vh',
            }}>
              <div style={{
                paddingTop: '20vh',
              }}>
                <h2 style={{ fontFamily: 'inter', color: '#163172', fontSize: '4vh', fontWeight: 'bold' }}>
                  Requests History
                </h2>
              </div>
              <div className="row mx-auto centered-row"
                style={{
                  marginTop: '20vh',
                }}
              >
                <div className='col-sm align-items-center justify-content-center'>
                  <div
                    style={{
                      backgroundColor: isHoveredFourth ? 'white' : 'transparent',
                      borderRadius: '5px',
                      boxShadow: isHoveredFourth ? '5px 5px 10px rgba(216, 63, 49, 0.3)' : 'none',
                      transition: 'background-color 0.2s, box-shadow 0.2s',
                      height: '40vh',
                      position: 'relative',
                      border: '2px solid #D83F31',
                    }}
                    onMouseEnter={() => setIsHoveredFourth(true)}
                    onMouseLeave={() => setIsHoveredFourth(false)}
                    onClick={() => window.location.href = "dismantleHistory"}
                    className='d-flex align-items-center my-2 justify-content-center'>
                    <div className='row'>
                      <img src={ClockTwo} alt="Logo" style={{ height: '5vh' }} />
                      <div style={{ height: '5vh' }}>
                        <h2 style={{ textAlign: 'center', fontFamily: 'inter', color: '#D83F31', fontSize: '5vh', marginTop: '10vh'}}>{reqCount.dismantle}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-sm align-items-center justify-content-center'>
                  <div
                    style={{
                      backgroundColor: isHoveredThird ? 'white' : 'transparent',
                      borderRadius: '5px',
                      boxShadow: isHoveredThird ? '5px 5px 10px rgba(233, 184, 36, 0.3)' : 'none',
                      transition: 'background-color 0.2s, box-shadow 0.2s',
                      height: '40vh',
                      position: 'relative',
                      border: '2px solid #E9B824',
                    }}
                    onMouseEnter={() => setIsHoveredThird(true)}
                    onMouseLeave={() => setIsHoveredThird(false)}
                    onClick={() => window.location.href = `relocationHistory`}
                    className='d-flex align-items-center my-2 justify-content-center'>
                    <div className='row'>
                      <img src={ClockOne} alt="Logo" style={{ height: '5vh' }} />
                      <div style={{ height: '5vh' }}>
                        <h2 style={{ textAlign: 'center', fontFamily: 'inter', color: ' #E9B824', fontSize: '5vh', marginTop:'10vh' }}>{reqCount.relocation}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-sm align-items-center justify-content-center'>
                  <div
                    style={{
                      backgroundColor: isHoveredFifth ? 'white' : 'transparent',
                      borderRadius: '5px',
                      boxShadow: isHoveredFifth ? '5px 5px 10px rgba(33, 156, 144, 0.3)' : 'none',
                      transition: 'background-color 0.2s, box-shadow 0.2s',
                      height: '40vh',
                      position: 'relative',
                      border: '2px solid #219C90',
                    }}
                    onMouseEnter={() => setIsHoveredFifth(true)}
                    onMouseLeave={() => setIsHoveredFifth(false)}
                    onClick={() => window.location.href = "installationbatch"}
                    className='d-flex align-items-center my-2 justify-content-center'>
                    <div className='row'>
                      <img src={ClockThree} alt="Logo" style={{ height: '5vh' }} />
                      <div style={{ height: '5vh' }}>
                        <h2 style={{ textAlign: 'center', fontFamily: 'inter', color: '#219C90', fontSize: '5vh', marginTop:'10vh'}}>{reqCount.installation}</h2>
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

export default Main;
