import React, { useEffect, useState } from "react";
import InputWithLabel from "./input";
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
            <InputWithLabel isDisabled={true}
              label="Location"
              value={data.old_location}
              name="location"
            />
            <div className="py-1">
            <InputWithLabel isDisabled={true}
              label="Address"
              value={data.old_address}
              name="address"
            />
          </div>
            <InputWithLabel isDisabled={true}
              label="Area"
              value={data.old_area}
              name="area"
            />
          </div>
        </div>
        <div className="col-md">
          <div className="form-group">
            <InputWithLabel isDisabled={true}
              label="Branch PIC"
              value={data.old_branch_pic}
              name="pic"
            />
            <div className="py-1">
              <InputWithLabel isDisabled={true}
                label="Communication"
                value={data.old_communication}
                name="communication"
              />
            </div>
            <div>
              <InputWithLabel isDisabled={true}
                label="Provider"
                value={data.provider}
                name="Provider"
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
          <InputWithLabel isDisabled={true}
            label="New Location"
            value={data.new_location}
            name="newLocation"
          />
          <div className="py-1">
          <InputWithLabel isDisabled={true}
            label="New Address"
            value={data.new_address}
            name="newAddress"
          />
          </div>
          <InputWithLabel isDisabled={true}
            label="New Area"
            value={data.new_area}
            name="newArea"
          />
        </div>
        <div className="col-lg">
          <div className="form-group">
            <InputWithLabel isDisabled={true}
              label="New Branch PIC"
              value={data.new_branch_pic}
              name="newPic"
            />
            <div className="py-1">
              <InputWithLabel isDisabled={true}
                label="New Communication"
                value={data.new_communication}
                name="newCommunication"
              />
            </div>
            <div>
              <InputWithLabel isDisabled={true}
                label="Provider"
                value={data.provider}
                name="Provider"
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
