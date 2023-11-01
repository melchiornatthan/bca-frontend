import React, { useState } from 'react';

function RelocationBatchTable({ batchdata, isAdmin = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const tableStyle = {
    maxHeight: '600px',
    overflowY: 'auto',
  };

  function formatCustomDate(dateString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString(undefined, options);
  }

  const toDetails = (id) => {
    const path = isAdmin ? '/admin/relocationDetails' : '/relocationDetails';
    window.location.href = `${path}?id=${id}`;
  };

  return (
    <div
      style={{
        borderRadius: '17px',
        padding: '20px',
        boxShadow: isHovered ? '10px 10px 20px rgba(233, 184, 36, 0.3)' : 'none',
        transition: 'box-shadow 0.5s',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='text-center w-75 mx-auto px-5'
    >
      <div style={tableStyle}>
        <table className="table">
          <thead>
            <tr>
              <th>Requested at</th>
              <th>Request ID</th>
              <th>Old Location</th>
              {isAdmin && <th>New Location</th>}
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {batchdata.map((entry, index) => (
              <tr key={index}>
                <td>{formatCustomDate(entry.createdAt)}</td>
                <td>{entry.id}</td>
                <td>{entry.old_location}</td>
                {isAdmin && <td>{entry.new_location}</td>}
                <td style={{
                  color: entry.status === 'pending' ? '#FFA500' : entry.status === 'approved' ? 'green' : 'black',
                }}>
                  <strong>{entry.status}</strong>
                </td>
                <td>
                  {(entry.status === 'approved' || isAdmin) && (
                    <button className="btn btn-primary" onClick={() => toDetails(entry.id)}>
                      Details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RelocationBatchTable;
