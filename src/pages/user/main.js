import React from 'react';
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
function Main() {

  const [isHoveredFirst, setIsHoveredFirst] = useState(false);
  const [isColHovered, setIsColHovered] = useState(false); // New state variable
  const [isHoveredSecond, setIsHoveredSecond] = useState(false);
  const [isColTwoHovered, setColTwoHovered] = useState(false);
  const [isHoveredThird, setIsHoveredThird] = useState(false);
  const [isColThreeHovered, setColThreeHovered] = useState(false);
  const [isHoveredFourth, setIsHoveredFourth] = useState(false);
  const [isColFourHovered, setColFourHovered] = useState(false);
  const [isHoveredFifth, setIsHoveredFifth] = useState(false);
  const [isColFiveHovered, setColFiveHovered] = useState(false);
  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#0060AF' }}>
        <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '20px' }} />
        <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }} onClick={() => window.location.href = "/login"} />
      </nav>
      <div className="container-fluid text-center" style={{
        height: '25vh',
      }}>
        <div className='my-5'>
          <h1 style={{ fontFamily: 'Montserrat', color: '#0060AF', fontWeight: 'bold' }}>
            Welcome to BCA App
          </h1>
        </div>
      </div>
      <div className="container-fluid text-center " style={{
        height: '85vh',
      }}>
        <div className="row w-75 mx-auto centered-row">
          <div className='col-5'>
            <div
              style={{
                backgroundColor: isColHovered ? 'white' : 'transparent', // Change background color on hover
                borderRadius: '33px',
                padding: '20px',
                boxShadow: isHoveredFirst ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
                transition: 'box-shadow 0.3s',
                height: '300px',
              }}
              onMouseEnter={() => {
                setIsHoveredFirst(true);
                setIsColHovered(true); // Set hover state to true on mouse enter
              }}
              onMouseLeave={() => {
                setIsHoveredFirst(false);
                setIsColHovered(false); // Set hover state to false on mouse leave
              }}
              onClick={() => window.location.href = "/installationrequest"}
              className='d-flex align-items-center justify-content-center'>
              <img src={installationLogo} alt="Logo" style={{ height: '75px' }} />
            </div>
          </div>
          <div className='col-lg d-flex align-items-center justify-content-center'>
            <img src={IntText} alt="Logo" style={{ height: '75px' }} />
          </div>
        </div>
        <div className="row w-75 mx-auto centered-row">
          <div className='col-lg d-flex align-items-center justify-content-center'>
            <img src={RnD} alt="Logo" style={{ height: '150px' }} />
          </div>
          <div className='col-5'>
            <div
              style={{
                backgroundColor: isColTwoHovered ? 'white' : 'transparent', // Change background color on hover
                borderRadius: '33px',
                padding: '20px',
                boxShadow: isHoveredSecond ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
                transition: 'box-shadow 0.3s',
                height: '300px',
              }}
              onMouseEnter={() => {
                setIsHoveredSecond(true);
                setColTwoHovered(true); // Set hover state to true on mouse enter
              }}
              onMouseLeave={() => {
                setIsHoveredSecond(false);
                setColTwoHovered(false); // Set hover state to false on mouse leave
              }}
              onClick={() => window.location.href = "/installationselect"}
              className='d-flex align-items-center justify-content-center'>
              <img src={RnDLogo} alt="Logo" style={{ height: '75px' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid text-center" style={{
        height: '30vh',
      }}>
        <h2 style={{ fontFamily: 'Montserrat', color: '#0060AF', fontWeight: 'bold' }}>
            Requests History
          </h2>
        <div className="row mx-auto centered-row py-5">
          <div className='col align-items-center justify-content-center'>
            <div
              style={{
                backgroundColor: isColThreeHovered ? 'white' : 'transparent', // Change background color on hover
                borderRadius: '33px',
                padding: '20px',
                boxShadow: isHoveredThird ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
                transition: 'box-shadow 0.3s',
                height: '300px',
              }}
              onMouseEnter={() => {
                setColThreeHovered(true);
                setIsHoveredThird(true) // Set hover state to true on mouse enter
              }}
              onMouseLeave={() => {
                setColThreeHovered(false);
                setIsHoveredThird(false) // Set hover state to false on mouse leave
              }}
              onClick={() => window.location.href = "/relocationbatch"}
              className='d-flex align-items-center justify-content-center'>
              <img src={ClockOne} alt="Logo" style={{ height: '40px' }} />
            </div>
          </div>
          <div className='col align-items-center justify-content-center'>
            <div
              style={{
                backgroundColor: isColFourHovered ? 'white' : 'transparent', // Change background color on hover
                borderRadius: '33px',
                padding: '20px',
                boxShadow: isHoveredFourth ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
                transition: 'box-shadow 0.3s',
                height: '300px',
              }}
              onMouseEnter={() => {
                setIsHoveredFourth(true);
                setColFourHovered(true); // Set hover state to true on mouse enter
              }}
              onMouseLeave={() => {
                setIsHoveredFourth(false);
                setColFourHovered(false); // Set hover state to false on mouse leave
              }}
              onClick={() => window.location.href = "/dismantlebatch"}
              className='d-flex align-items-center justify-content-center'>
              <img src={ClockTwo} alt="Logo" style={{ height: '40px' }} />
            </div>
          </div>
          <div className='col align-items-center justify-content-center'>
            <div
              style={{
                backgroundColor: isColFiveHovered ? 'white' : 'transparent', // Change background color on hover
                borderRadius: '33px',
                padding: '20px',
                boxShadow: isHoveredFifth ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
                transition: 'box-shadow 0.3s',
                height: '300px',
              }}
              onMouseEnter={() => {
                setIsHoveredFifth(true);
                setColFiveHovered(true); // Set hover state to true on mouse enter
              }}
              onMouseLeave={() => {
                setIsHoveredFifth(false);
                setColFiveHovered(false); // Set hover state to false on mouse leave
              }}
              onClick={() => window.location.href = "/installationbatch"}
              className='d-flex align-items-center justify-content-center'>
              <img src={ClockThree} alt="Logo" style={{ height: '40px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
