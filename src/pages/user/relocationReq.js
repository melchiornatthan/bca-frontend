import React from 'react';
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import UneditableInputWithLabel from "../components/uneditableInput";
import InputWithLabel from "../components/input";
import SelectLocation from "../components/locations";
import VsatSelect from "../components/communication";
import CustomButton from "../components/button";

function RelocationReq() {
    const location = useLocation();
    const [area, setArea] = useState('');
    const [newPic, setNewPic] = useState('');
    const [areas, setAreas] = useState([]);
    const [areaId, setAreaId] = useState();
    const [newCommunication, setNewCommunication] = useState('VSAT');
    const [data, setData] = useState({});
    const [newLocation, setNewLocation] = useState('');
    const [newAddress, setNewAddress] = useState('');
    // Parse the URL parameters and extract the 'data' parameter
    const searchParams = new URLSearchParams(location.search);
    const intId = parseInt(searchParams.get('id'), 10);
    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };
    useEffect(() => {
        fetchLocationData();
        getInstallationData();
    }, [intId]);

    const fetchLocationData = () => {
        axios.get('http://localhost:3333/bca-app/locations')
          .then((response) => {
            setAreas(response.data.list);
          })
          .catch((error) => {
            console.error('Error fetching location data:', error);
          });
      };

    const getInstallationData = async () => {
        await axios.get('http://localhost:3333/bca-app/installationsById/' + intId + '')
            .then((response) => {
                console.log(response);
                setData(response.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching location data:', error);
            });
    };
    useEffect(() => {
        getAreaId();
    }, [area]);
    const getAreaId = async () => {
        await axios.get('http://localhost:3333/bca-app/locationByArea/' + area + '')
        .then((response) => {
            setAreaId(response.data[0].id);
        })
        .catch((error) => {
            console.error('Error fetching location data:', error);
        });
    };
    const submitRelocation = async () => {
        const requestData = {
            installation_id: intId,
            old_location: data.location,
            new_location: newLocation,
            old_address: data.address,
            new_address: newAddress,
            old_area: data.area,
            new_area: area,
            old_branch_pic: data.branch_pic,
            old_area_id: data.area_id,
            new_area_id: areaId,
            new_branch_pic: newPic,
            old_communication: data.communication,
            new_communication: newCommunication
        };
        const response = await axios.post('http://localhost:3333/bca-app/relocation-request', requestData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then((res) => {
            toast.success('Request submitted successfully');
            window.location.href = '/installationSelect';
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
            <div className="text-center mt-5" style={{ fontFamily: 'Montserrat' }}>
                <h1>Relocation Request</h1>
            </div>
            <div className="row py-5 w-75 mx-auto">
                <div className="col-md">
                    <div className="form-group">
                        <UneditableInputWithLabel
                            label="Location"
                            value={data.location}
                            name="location"
                        />
                        <UneditableInputWithLabel
                            label="Address"
                            value={data.address}
                            name="address"
                        />
                    </div>
                    <div>
                        <UneditableInputWithLabel
                            label="Area"
                            value={data.area}
                            name="area"
                        />
                    </div>
                </div>
                <div className="col-md">
                    <div className="form-group">
                        <UneditableInputWithLabel
                            label="Branch PIC"
                            value={data.branch_pic}
                            name="pic"
                        />
                        <div className="py-1">
                            <UneditableInputWithLabel
                                label="Communication"
                                value={data.communication}
                                name="communication"
                            />
                        </div>



                    </div>
                </div>
            </div>
            <div className="row w-75 mx-auto">
                <div className="col-lg">
                    <InputWithLabel
                        label="New Location"
                        value={newLocation}
                        name="newLocation"
                        placeholder="Enter the new location"
                        onChange={(e) => handleInputChange(e, setNewLocation)}
                    />
                    <InputWithLabel
                        label="New Address"
                        value={newAddress}
                        name="newAddress"
                        placeholder="Enter the new address"
                        onChange={(e) => handleInputChange(e, setNewAddress)}
                    />
                    <div>
                        <SelectLocation
                            options={areas}
                            label="Select the Area"
                            value={area}
                            onChange={(e) => handleInputChange(e, setArea)}
                        />
                    </div>
                </div>
                <div className="col-lg">
                    <div className="form-group">
                        <InputWithLabel
                            label="Branch PIC"
                            value={newPic}
                            name="pic"
                            placeholder="Enter the Branch PIC"
                            onChange={(e) => handleInputChange(e, setNewPic)}
                        />
                        <div className="py-1">
                            <label htmlFor="communication" style={{ fontFamily: 'Montserrat' }} className="py-1">Communication</label>
                            <VsatSelect
                                value={newCommunication}
                                onChange={(e) => handleInputChange(e, setNewCommunication)}
                            />
                        </div>
                        <div className="row py-4 mx-auto text-center">
                            <div className="col-md">
                                <CustomButton
                                    text="Submit"
                                    color="primary"
                                    onClick={() => submitRelocation()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
}

export default RelocationReq;
