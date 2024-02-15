import { useState, useEffect } from "react";
import { Container, Breadcrumb, Form } from "react-bootstrap";
import "typeface-inter";
import DismantleServiceTable from "../../components/dismantleBatchTable";
import InputWithLabel from "../../components/input";
import { useNavigate } from "react-router-dom";
import { RiHome6Fill } from "react-icons/ri";
import { getBatchDismantle } from "../../service/getBatchDismantle";

function DismantleSearch() {
  const [data, setData] = useState([]);
  const [batchid, setBatchId] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
   getBatchDismantle('2', setData);
  }, []);

  useEffect(() => {
    getBatchDismantle(batchid, setData);
  }, [batchid]);


  return (
    <Container fluid>
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => navigate("/user")} />
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            History
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container style={{ width: "45%" }}>
        <Form>
          <InputWithLabel
            label="Enter Batch ID"
            value={batchid}
            name="pic"
            placeholder="Enter the dismantle Batch ID"
            onChange={(e) => handleInputChange(e, setBatchId)}
          />
        </Form>
      </Container>
      <Container className="my-5">
        <DismantleServiceTable batchdata={data} />
      </Container>
    </Container>
  );
}

export default DismantleSearch;
