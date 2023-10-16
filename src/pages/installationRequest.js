import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CustomButton from "./components/button";
import SelectLocation from "./components/locations";
import InputWithLabel from "./components/input";
import VsatSelect from "./components/communication";

function InstallationReq() {
  // State variables
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [pic, setPic] = useState('');
  const [data, setData] = useState([]);
  const [area, setArea] = useState('jakarta');
  const [communication, setCommuniation] = useState('VSAT');

  // Reusable input change handler
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  // Fetch data from the server
  useEffect(() => {
    fetchLocationData();
  }, []);

  // Fetch location data from the server
  const fetchLocationData = () => {
    axios.get('http://localhost:3333/bca-app/locations')
      .then((response) => {
        setData(response.data.list);
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
        // You can add error handling logic or show an error message to the user here
      });
  };

  // Handle form submission
  const handleSubmit = () => {
    const requestData = {
      location,
      address,
      branch_pic: pic,
      area: area,
      communication: communication,
    };

    axios.post('http://localhost:3333/bca-app/installation-request', requestData)
      .then((response) => {
        console.log('Data submitted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  return (
    <div className="py-5">
      <div className="text-center">
        <h1>Installation Request</h1>
      </div>
      <div className="container">
        <div className="row py-5 w-50 mx-auto">
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
                <label htmlFor="communication" className="py-1">Communication</label>
                <VsatSelect
                  value={pic}
                  onChange={(e) => handleInputChange(e, setCommuniation)}
                />
              </div>
              <div className="py-4 mx-auto text-center">
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
    </div>
  );
}

export default InstallationReq;
