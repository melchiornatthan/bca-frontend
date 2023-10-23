import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackLogo from '../assets/Back-Sign.svg';
import bcaLogo from '../assets/white-bca.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomButton from '../components/button';
import SelectLocation from '../components/locations';
import InputWithLabel from '../components/input';
import VsatSelect from '../components/communication';

function InstallationReq() {
  // State variables
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [pic, setPic] = useState('');
  const [data, setData] = useState([]);
  const [area, setArea] = useState('Jakarta');
  const [communication, setCommunication] = useState('VSAT');
  const [batchId, setBatchId] = useState();
  const [batchData, setBatchData] = useState([]);
  const [submittedRequests, setSubmittedRequests] = useState([]);

  // Batch ID generator
  async function generateBatchId() {
    await axios.get('http://localhost:3333/bca-app/getBatchId')
    .then((response) => {
      const currentBatchId = parseInt(response.data.batchid, 10);
      const newBatchId = currentBatchId + 1;
      setBatchId(newBatchId);
    })
    .catch((error) => {
      console.error('Error fetching location data:', error);
    });
  }

  // Reusable input change handler
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  // Fetch data from the server
  useEffect(() => {
    generateBatchId();
    fetchLocationData();
  }, []);

  const fetchLocationData = () => {
    axios.get('http://localhost:3333/bca-app/locations')
      .then((response) => {
        setData(response.data.list);
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate that all required fields are filled
    if (!location || !address || !pic || !area || !communication) {
      // Show a toast message if the form is not valid
      toast.error('Please fill in all input fields.');
      return;
    }

    const requestData = {
      location,
      address,
      branch_pic: pic,
      area,
      communication,
    };

    setBatchData([...batchData, requestData]);
    setSubmittedRequests([...submittedRequests, requestData]);

    setLocation('');
    setAddress('');
    setPic('');
  };

  // Submit batch data
  const submitBatchData = async () => {
    if (batchData.length === 0) {
      return; // No data to submit
    }
  
    try {
      setBatchId(generateBatchId());
      let date = new Date();
      for (let i = 0; i < batchData.length; i++) {
        batchData[i].batchid = batchId;
        batchData[i].createdAt = date;
        const requestData = batchData[i];
        console.log(batchId)
        const response = await axios.post('http://localhost:3333/bca-app/installation-request', requestData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log('Request submitted successfully:', response.data);
      }
      toast.success('Request submitted successfully');
      setBatchData([]); // Clear the batch data
      setSubmittedRequests([]); // Clear the previous requests
      setBatchId(generateBatchId());
    } catch (error) {
      console.error('Error submitting batch data:', error);
      toast.error('Error submitting batch data');
    }
  };

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#0060AF' }}>
        <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '20px' }} />
        <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }} onClick={() => window.location.href = "/login"} />
      </nav>
      <div className="container mt-5">
        <div className="text-center" style={{ fontFamily: 'Montserrat' }}>
          <h1>Installation Request</h1>
        </div>
        <div className="row py-5 w-75 mx-auto">
          <div className="col-md">
            <div className="form-group">
              <InputWithLabel
                label="Location"
                value={location}
                name="location"
                placeholder="Enter the location"
                onChange={(e) => handleInputChange(e, setLocation)}
              />
              <InputWithLabel
                label="Address"
                value={address}
                name="address"
                placeholder="Enter the address"
                onChange={(e) => handleInputChange(e, setAddress)}
              />
            </div>
            <div>
              <SelectLocation
                options={data}
                label="Select the Area"
                value={area}
                onChange={(e) => handleInputChange(e, setArea)}
              />
            </div>
          </div>
          <div className="col-md">
            <div className="form-group">
              <InputWithLabel
                label="Branch PIC"
                value={pic}
                name="pic"
                placeholder="Enter the Branch PIC"
                onChange={(e) => handleInputChange(e, setPic)}
              />
              <div className="py-1">
                <label htmlFor="communication" style={{ fontFamily: 'Montserrat' }} className="py-1">Communication</label>
                <VsatSelect
                  value={communication}
                  onChange={(e) => handleInputChange(e, setCommunication)}
                />
              </div>
              <div className="row py-4 mx-auto text-center">
                <div className="col-md">
                  <CustomButton
                    text="Submit"
                    color="primary"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {submittedRequests.length > 0 && (
          <div className="row py-4 mx-auto">
            <div className="col-md">
              <h2>Submitted Requests:</h2>
              <table className="table">
                <thead>
                  <tr>
                    
                    <th>Location</th>
                    <th>Address</th>
                    <th>Branch PIC</th>
                    <th>Area</th>
                    <th>Communication</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedRequests.map((request, index) => (
                    <tr key={index}>
                     
                      <td>{request.location}</td>
                      <td>{request.address}</td>
                      <td>{request.branch_pic}</td>
                      <td>{request.area}</td>
                      <td>{request.communication}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='text-center mx-auto'>
              <CustomButton
                text="Submit Batch"
                color="primary"
                onClick={() => submitBatchData()}
              />
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default InstallationReq;
