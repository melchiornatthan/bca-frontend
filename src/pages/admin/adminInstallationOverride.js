import axios from "axios";
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import UneditableInputWithLabel from "../components/uneditableInput";
import SelectProviders from "../components/providers";


function InstallationOverride() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [provData, setProvData] = useState([]);
  const [provider, setProvider] = useState();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getInstallationById();
    
  }, []);

  useEffect(() => {
   
getProviderAlternatives();
    
  }, [
    data
  ]);

  const getInstallationById = async () => {
    await axios.get('http://localhost:3333/bca-app/installationsById/' + id + '')
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  };

  const getProviderAlternatives = async () => {
    console.log(data.area_id);
    await axios.get(`http://localhost:3333/bca-app/getProvidersbyArea/${data.area_id}`)
      .then((response) => {
        setProvData(response.data.list);
        console.log(response.data.list);
      })
      .catch((error) => {
        console.error('Error fetching Provider data:', error);
      });
  };

  const overrideInstallation = async () => {
    console.log(data.id);
    console.log(provider);
    console.log(data.area);
    await axios.post('http://localhost:3333/bca-app/installation-override', {
      id: data.id,
      id_prov: provider,
      location: data.area
    })
      .then((response) => {
        console.log(response);
        window.location.href=`/admin/installationDetails?batchid=${data.batchid}`
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
        <h1>Installation Override</h1>
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
            <SelectProviders
              options={provData}
              label="Provider"
              value={provider}
              onChange={(e) => handleInputChange(e, setProvider)}
            />
            <div className="text-center mt-3">
              <button className="btn btn-danger" onClick={() => overrideInstallation()}>Override</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default InstallationOverride;
