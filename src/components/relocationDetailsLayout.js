import React, { useEffect, useState } from "react";
import InputWithLabel from "./input";

/**
 * RelocationDetailService Component renders the details of relocation service.
 * @param {Object} props - The component's props.
 * @param {Object} props.batchdata - Data for the relocation service batch.
 * @param {Function} props.updateRequestStatus - Function to update request status.
 * @returns {JSX.Element} - RelocationDetailService component.
 */
function RelocationDetailService({ batchdata = {}, updateRequestStatus }) {
  const [data, setData] = useState({});
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    setData(batchdata);
  }, [batchdata]);

  return (
    <div>
      {/* Displaying old location details */}
      <div className="text-center mt-5" style={{ fontFamily: "inter" }}>
        <h2>Old Location</h2>
      </div>
      <div className="row w-75 mx-auto mt-5">
        <div className="col-md">
          <div className="form-group">
            {/* InputWithLabel component for old location */}
            <InputWithLabel
              isDisabled={true}
              label="Location"
              value={data.old_location}
              name="location"
            />
            <div className="py-1">
              {/* InputWithLabel component for old address */}
              <InputWithLabel
                isDisabled={true}
                label="Address"
                value={data.old_address}
                name="address"
              />
            </div>
            {/* InputWithLabel component for old area */}
            <InputWithLabel
              isDisabled={true}
              label="Area"
              value={data.old_area}
              name="area"
            />
          </div>
        </div>
        <div className="col-md">
          <div className="form-group">
            {/* InputWithLabel component for old branch PIC */}
            <InputWithLabel
              isDisabled={true}
              label="Branch PIC"
              value={data.old_branch_pic}
              name="pic"
            />
            <div className="py-1">
              {/* InputWithLabel component for old communication */}
              <InputWithLabel
                isDisabled={true}
                label="Communication"
                value={data.old_communication}
                name="communication"
              />
            </div>
            <div>
              {/* InputWithLabel component for provider */}
              <InputWithLabel
                isDisabled={true}
                label="Provider"
                value={data.provider}
                name="Provider"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Displaying new location details */}
      <div className="text-center mt-5" style={{ fontFamily: "inter" }}>
        <h2>New Location</h2>
      </div>
      <div className="row w-75 mx-auto mt-4">
        <div className="col-lg">
          {/* InputWithLabel component for new location */}
          <InputWithLabel
            isDisabled={true}
            label="New Location"
            value={data.new_location}
            name="newLocation"
          />
          <div className="py-1">
            {/* InputWithLabel component for new address */}
            <InputWithLabel
              isDisabled={true}
              label="New Address"
              value={data.new_address}
              name="newAddress"
            />
          </div>
          {/* InputWithLabel component for new area */}
          <InputWithLabel
            isDisabled={true}
            label="New Area"
            value={data.new_area}
            name="newArea"
          />
        </div>
        <div className="col-lg">
          <div className="form-group">
            {/* InputWithLabel component for new branch PIC */}
            <InputWithLabel
              isDisabled={true}
              label="New Branch PIC"
              value={data.new_branch_pic}
              name="newPic"
            />
            <div className="py-1">
              {/* InputWithLabel component for new communication */}
              <InputWithLabel
                isDisabled={true}
                label="New Communication"
                value={data.new_communication}
                name="newCommunication"
              />
            </div>
            <div>
              {/* InputWithLabel component for provider */}
              <InputWithLabel
                isDisabled={true}
                label="Provider"
                value={data.provider}
                name="Provider"
              />
            </div>
          </div>
          <div className="text-center mt-3">
            {/* Render button for relocating if isAdmin and status is pending */}
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

export default RelocationDetailService; // Export RelocationDetailService component
