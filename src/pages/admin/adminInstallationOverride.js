import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Breadcrumb, Row, Col, Button } from "react-bootstrap";
import axios from "../../axiosConfig";
import SelectProviders from "../components/providers";
import InputWithLabel from "../components/input";
import Navbar from "../components/navbar";
import { RiHome6Fill } from "react-icons/ri";

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
      .post("installation-override", {
        id: data.id,
        id_prov: provider,
        location: data.area,
      })
      .then((response) => {
        console.log(response);
        window.location.href = `/admin/installationDetails?batchid=${data.batchid}`;
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  return (
    <Container fluid className="pt-3">
      <Navbar />
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => window.location.href = "/admin/main"} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() => window.location.href = "/admin/installationBatch"} 
            >
              History
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() => window.location.href = `/admin/installationDetails?batchid=${data.batchid}`} 
            >
              Details
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Override
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container className="text-center mt-5" style={{ fontFamily: "inter" }}>
        <h1>Installation Override</h1>
      </Container>
      <Container className="py-5 mx-auto">
        <Row>
          <Col md>
            <div className="form-group">
              <InputWithLabel
                isDisabled={true}
                label="Location"
                value={data.location}
                name="location"
              />
              <InputWithLabel
                isDisabled={true}
                label="Address"
                value={data.address}
                name="address"
              />
              <InputWithLabel
                isDisabled={true}
                label="Area"
                value={data.area}
                name="area"
              />
            </div>
          </Col>
          <Col md>
            <div className="form-group">
              <InputWithLabel
                isDisabled={true}
                label="Branch PIC"
                value={data.branch_pic}
                name="pic"
              />
              <InputWithLabel
                isDisabled={true}
                label="Communication"
                value={data.communication}
                name="communication"
              />
              <SelectProviders
                options={provData}
                label="Provider"
                value={provider}
                onChange={(e) => handleInputChange(e, setProvider)}
              />
              <div className="text-center mt-3">
                <Button
                  variant="danger"
                  onClick={() => overrideInstallation()}
                >
                  Override
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default InstallationOverride;
