import React from 'react';
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import UneditableInputWithLabel from "../components/uneditableInput";


function RelocationDetails() {
    const [data, setData] = useState({});
    const location = useLocation();
    // Parse the URL parameters and extract the 'data' parameter
    const searchParams = new URLSearchParams(location.search);
    const int_id = parseInt(searchParams.get('id'), 10);

    useEffect(() => {
        getRelocationData();
        console.log(data);
    }, [int_id]);

    const getRelocationData = async () => {
        await axios.get('http://localhost:3333/bca-app/relocations/' + int_id + ''
        ).then((response) => {
            setData(response.data);
            console.log(data);
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
            <div className='text-center mt-5' style={{ fontFamily: 'Montserrat' }}>
                <h2>Old Location</h2>
            </div>
            <div className="row w-75 mx-auto mt-5">
                <div className="col-md">
                    <div className="form-group">
                        <UneditableInputWithLabel
                            label="Location"
                            value={data.old_location}
                            name="location"
                        />
                        <UneditableInputWithLabel
                            label="Address"
                            value={data.old_address}
                            name="address"
                        />
                    </div>
                    <div>
                        <UneditableInputWithLabel
                            label="Area"
                            value={data.old_area}
                            name="area"
                        />
                    </div>
                </div>
                <div className="col-md">
                    <div className="form-group">
                        <UneditableInputWithLabel
                            label="Branch PIC"
                            value={data.old_branch_pic}
                            name="pic"
                        />
                        <div className="py-1">
                            <UneditableInputWithLabel
                                label="Communication"
                                value={data.old_communication}
                                name="communication"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center mt-5' style={{ fontFamily: 'Montserrat' }}>
                <h2>New Location</h2>
            </div>
            <div className="row w-75 mx-auto mt-4">
                <div className="col-lg">
                    <UneditableInputWithLabel
                        label="New Location"
                        value={data.new_location}
                        name="newLocation"
                    />
                    <UneditableInputWithLabel
                        label="New Address"
                        value={data.new_address}
                        name="newAddress"
                    />
                    <UneditableInputWithLabel
                        label="New Area"
                        value={data.new_area}
                        name="newArea"
                    />
                </div>
                <div className="col-lg">
                    <div className="form-group">
                        <UneditableInputWithLabel
                            label="New Branch PIC"
                            value={data.new_branch_pic}
                            name="newPic"
                        />
                        <div className="py-1">
                            <UneditableInputWithLabel
                                label="New Communication"
                                value={data.new_communication}
                                name="newCommunication"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelocationDetails;
