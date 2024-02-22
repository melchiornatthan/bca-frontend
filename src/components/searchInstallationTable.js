import React from "react";

/**
 * InstallationSearchTable Component displays installation search results.
 * @param {Object} props - The component's props.
 * @param {Array} props.batchdata - Data for installation search.
 * @param {function} props.onSelect - Callback function for selecting an installation.
 * @returns {JSX.Element} - InstallationSearchTable component.
 */
function InstallationSearchTable({ batchdata, onSelect }) {
  const tableStyle = {
    maxHeight: "20vh",
    overflowY: "auto",
  };

  /**
   * Handles the click event of the "Select" button and calls the onSelect callback with the ID.
   * @param {string} id - The ID of the selected installation.
   */
  const handleSelectClick = (id) => {
    onSelect(id);
  };

  return (
    <div
      style={{
        borderRadius: "17px",
        padding: "20px",
      }}
      className="text-center mx-auto px-5"
    >
      <div style={tableStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {batchdata.map((entry, index) => (
              <tr key={index}>
                <td>{entry.location}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSelectClick(entry.id)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InstallationSearchTable; // Export InstallationSearchTable component
