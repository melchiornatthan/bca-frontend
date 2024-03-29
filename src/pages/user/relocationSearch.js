import { useState, useEffect } from "react";
import { Container, Breadcrumb } from 'react-bootstrap';
import RelocationBatchTable from "../../components/relocationBatchTable";
import InputWithLabel from "../../components/input";
import "typeface-inter";
import { RiHome6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getRelocationsbyBatchID } from "../../service/getBatchRelocations";

function RelocationSearch() {
  const [relocationData, setRelocationData] = useState([]);
  const [batchid, setBatchId] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getRelocationsbyBatchID('2', setRelocationData);
  }, []);

  

  useEffect(() => {
    getRelocationsbyBatchID(batchid, setRelocationData);
  }, [batchid]);

  return (
    <Container>
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() =>navigate("/user")} />
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            History
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container style={{ width: "45%" }}>
        <InputWithLabel
          label="Enter Batch ID"
          value={batchid}
          name="pic"
          placeholder="Enter the relocation Batch ID"
          onChange={(e) => handleInputChange(e, setBatchId)}
        />
      </Container>
      <Container className="my-5">
        <RelocationBatchTable batchdata={relocationData}  />
      </Container>
    </Container>
  );
}

export default RelocationSearch;
