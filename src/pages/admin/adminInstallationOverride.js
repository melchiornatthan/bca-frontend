import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Breadcrumb, Row, Col, Button } from "react-bootstrap";
import axios from "../../axiosConfig";
import SelectProviders from "../../components/providers";
import InputWithLabel from "../../components/input";
import { useNavigate } from "react-router-dom";
import { RiHome6Fill } from "react-icons/ri";
import { getInstallationById } from "../../service/getInstallationbyID";
import { getProviderAlternatives } from "../../service/getProviderAlternatives";

function AdminInstallationOverride() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [provData, setProvData] = useState([]);
  const [provider, setProvider] = useState(1);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getInstallationById(id, setData);
  }, []);

  useEffect(() => {
    if (data.area_id) {
      // Call the separated function
      getProviderAlternatives(data.area_id, setProvData);
    }
  }, [data.area_id]);


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
        navigate(`/admin/installationHistory/installationDetails?batchid=${data.batchid}`);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  return (
    <Container fluid>
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => navigate("/admin")} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() => navigate("/admin/installationHistory")} 
            >
              History
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() => navigate(`/admin/installationHistory/installationDetails?batchid=${data.batchid}`)} 
            >
              Details
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Override
          </Breadcrumb.Item>
        </Breadcrumb>
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

export default AdminInstallationOverride;
