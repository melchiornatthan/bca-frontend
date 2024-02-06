import React, { useEffect, useState } from "react";
import InputWithLabel from "./input";
function DismantleDetailsService({ batchdata, updateRequestStatus }) {
  const [data, setData] = useState({});
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  useEffect(() => {
    setData(batchdata);
  }, [batchdata]);

  return (
    <div>
      <div className="row w-75 mx-auto mt-5">
        <div className="col-md">
          <div className="form-group">
            <InputWithLabel
              isDisabled={true}
              label="Location"
              value={data.location}
              name="location"
            />
            <div className="py-1">
              <InputWithLabel
                isDisabled={true}
                label="Address"
                value={data.address}
                name="address"
              />
            </div>

            <InputWithLabel
              isDisabled={true}
              label="Area"
              value={data.area}
              name="area"
            />
          </div>
        </div>
        <div className="col-md">
          <div className="form-group">
            <InputWithLabel
              isDisabled={true}
              label="Branch PIC"
              value={data.branch_pic}
              name="pic"
            />
            <div className="py-1">
              <InputWithLabel
                isDisabled={true}
                label="Communication"
                value={data.communication}
                name="communication"
              />
            </div>
            <InputWithLabel
              isDisabled={true}
              label="Provider"
              value={data.provider}
              name="Provider"
            />
          </div>
          {isAdmin && data.dismantle_status === true && (
            <div className="text-center mt-3">
              <button
                className="btn btn-danger"
                onClick={() => updateRequestStatus()}
              >
                Dismantle
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DismantleDetailsService;
