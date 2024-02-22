import React, { useEffect, useState } from "react";
import InputWithLabel from "./input";

/**
 * DismantleDetailsService component renders details of a dismantling service request.
 * @param {Object} batchdata - Object containing batch data.
 * @param {function} updateRequestStatus - Function to update the status of the request.
 * @returns {JSX.Element} - Details of the dismantling service request.
 */
function DismantleDetailsService({ batchdata, updateRequestStatus }) {
  const [data, setData] = useState({}); // State to store batch data
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check if user is an admin

  // Update data state when batchdata prop changes
  useEffect(() => {
    setData(batchdata);
  }, [batchdata]);

  return (
    <div>
      <div className="row w-75 mx-auto mt-5">
        <div className="col-md">
          <div className="form-group">
            {/* Input field for Location */}
            <InputWithLabel
              isDisabled={true}
              label="Location"
              value={data.location}
              name="location"
            />
            <div className="py-1">
              {/* Input field for Address */}
              <InputWithLabel
                isDisabled={true}
                label="Address"
                value={data.address}
                name="address"
              />
            </div>

            {/* Input field for Area */}
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
            {/* Input field for Branch PIC */}
            <InputWithLabel
              isDisabled={true}
              label="Branch PIC"
              value={data.branch_pic}
              name="pic"
            />
            <div className="py-1">
              {/* Input field for Communication */}
              <InputWithLabel
                isDisabled={true}
                label="Communication"
                value={data.communication}
                name="communication"
              />
            </div>
            {/* Input field for Provider */}
            <InputWithLabel
              isDisabled={true}
              label="Provider"
              value={data.provider}
              name="Provider"
            />
          </div>
          {/* Render Dismantle button if user is admin and dismantle_status is true */}
          {isAdmin && data.dismantle_status === true && (
            <div className="text-center mt-3">
              <button
                className="btn btn-danger"
                onClick={() => updateRequestStatus()} // Call updateRequestStatus function when button is clicked
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

export default DismantleDetailsService; // Export the DismantleDetailsService component for use in other files
