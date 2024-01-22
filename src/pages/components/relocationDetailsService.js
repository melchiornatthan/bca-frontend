import React, { useEffect, useState } from "react";
import UneditableInputWithLabel from "./uneditableInput";
import "typeface-inter";
function RelocationDetailService({
  batchdata = {},
  isAdmin = false,
  updateRequestStatus,
}) {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(batchdata);
  }, [batchdata]);

  return (
    <div>
      <div className="text-center mt-5" style={{ fontFamily: "inter" }}>
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
      <div className="text-center mt-5" style={{ fontFamily: "inter" }}>
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
          <div className="text-center mt-3">
            {isAdmin && data.status === "pending" && (
              <button
                className="btn btn-warning"
                onClick={() => updateRequestStatus(data.id)}
              >
                Relocate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelocationDetailService;
