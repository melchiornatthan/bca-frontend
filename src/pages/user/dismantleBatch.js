
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import DismantleService from "../components/DismantleService";
function DismantleBatch() {

  const [dismantleData, setDismantleData] = useState([]);

  useEffect(() => {
    getDismantlesData();
  }, []);

  const getDismantlesData = () => {
    axios.get('http://localhost:3333/bca-app/dismantles')
      .then((response) => {
        console.log(response.data);
        setDismantleData(response.data);
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
      <div className="container my-5 text-center">
      <h1 style={{ fontFamily: 'Montserrat', color: '#D83F31', fontWeight: 'bold' }}>
        Dismantle Requests
      </h1>
      </div>
      <div className="mt-5">
        <DismantleService batchdata={dismantleData} isAdmin={false}  />
      </div>

    </div>
  );
}

export default DismantleBatch;
