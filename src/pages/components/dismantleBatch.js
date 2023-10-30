import React, { useState } from 'react';

function DismantleBatchTable({ batchdata }) {
  const [isHoveredFirst, setIsHoveredFirst] = useState(false);
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
    window.location.href = '/dismantleDetails?id=' + id + '';
  };

  return (
    <div
      style={{
        borderRadius: '17px',
            padding: '20px',
            boxShadow: isHoveredFirst ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
            transition: 'box-shadow 0.5s',
      }}
      onMouseEnter={() => setIsHoveredFirst(true)}
      onMouseLeave={() => setIsHoveredFirst(false)}
      className='text-center w-75 mx-auto px-5'
    >
      <div style={tableStyle}>
        <table className="table">
          <thead>
            <tr>
              <th>Requested at</th>
              <th>Request ID</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {batchdata.map((entry, index) => (
              <tr key={index}>
                <td>{formatCustomDate(entry.createdAt)}</td>
                <td>{entry.id}</td>
                <td>{entry.location}</td>
                <td style={{
                  color: entry.status === 'pending' ? '#FFA500' : entry.status === 'approved' ? 'green' : 'black',
                }}>
                  <strong>{entry.status}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DismantleBatchTable;
