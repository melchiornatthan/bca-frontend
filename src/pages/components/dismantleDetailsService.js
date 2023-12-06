import React, { useEffect, useState } from "react";
import UneditableInputWithLabel from "./uneditableInput";

function DismantleDetailsService({ batchdata, isAdmin, updateRequestStatus }) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(batchdata);
  }, [batchdata]);

  return (
    <div>
      <div className="row w-75 mx-auto mt-5">
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
          {isAdmin && data.dismantle_status == true && (
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
