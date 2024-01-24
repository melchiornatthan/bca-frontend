import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SelectProviders from "../components/providers";
import "typeface-inter";
import { RiHome6Fill } from "react-icons/ri";
import Navbar from "../components/navbar";
import InputWithLabel from "../components/input";

function InstallationOverride() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [provData, setProvData] = useState([]);
  const [provider, setProvider] = useState(1);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getInstallationById();
  }, []);

  useEffect(() => {
    getProviderAlternatives();
  }, [data]);

  const getInstallationById = async () => {
    await axios
      .get("installationsById/" + id + "")
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const getProviderAlternatives = async () => {
    console.log(data.area_id);
    await axios
      .get(`getProvidersbyArea/${data.area_id}`)
      .then((response) => {
        setProvData([
          ...response.data.list,
          { provider: { id: 5, provider: "Telkomsel (M2M)" } },
        ]);
        console.log(response.data.list);
      })
      .catch((error) => {
        console.error("Error fetching Provider data:", error);
      });
  };

  const overrideInstallation = async () => {
    console.log(data.id);
    console.log(provider);
    console.log(data.area);
    await axios
      .post(
        "installation-override",
        {
          id: data.id,
          id_prov: provider,
          location: data.area,
        }
      )
      .then((response) => {
        console.log(response);
        window.location.href = `/admin/installationDetails?batchid=${data.batchid}`;
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  return (
    <div>
       <Navbar/>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3">
            <li className="breadcrumb-item">
               <RiHome6Fill onClick={() => window.location.href = "/admin/main"}/>
            </li>
            <li className="breadcrumb-item">
              <a
                className="link-body-emphasis fw-semibold text-decoration-none"
                href="/admin/installationBatch"
              >
                History
              </a>
            </li>
            <li className="breadcrumb-item">
              <a
                className="link-body-emphasis fw-semibold text-decoration-none"
                href={`/admin/installationDetails?batchid=${data.batchid}`}
              >
                Details
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Override
            </li>
          </ol>
        </nav>
      </div>
      <div className="text-center mt-5" style={{ fontFamily: "inter" }}>
        <h1>Installation Override</h1>
      </div>
      <div className="row py-5 w-75 mx-auto">
        <div className="col-md">
          <div className="form-group">
            <InputWithLabel isDisabled={true}
              label="Location"
              value={data.location}
              name="location"
            />
            <InputWithLabel isDisabled={true}
              label="Address"
              value={data.address}
              name="address"
            />
          </div>
          <div>
            <InputWithLabel isDisabled={true}
              label="Area"
              value={data.area}
              name="area"
            />
          </div>
        </div>
        <div className="col-md">
          <div className="form-group">
            <InputWithLabel isDisabled={true}
              label="Branch PIC"
              value={data.branch_pic}
              name="pic"
            />
            <div className="py-1">
              <InputWithLabel isDisabled={true}
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
              <button
                className="btn btn-danger"
                onClick={() => overrideInstallation()}
              >
                Override
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstallationOverride;
