import React, { useState } from 'react';
import axios from 'axios';

function BatchTable({ batchdata }) {
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

  const toDetails = (batchid) => {
    window.location.href = '/installationDetails?batchid=' + batchid + '';
  };

  return (
    <div
      style={{
        border: '1px solid #219C90',
        borderRadius: '33px',
        padding: '20px',
        boxShadow: isHoveredFirst ? '10px 10px 20px rgba(33, 156, 144, 0.2)' : 'none',
        transition: 'box-shadow 0.3s',
      }}
      className='text-center w-75 mx-auto px-5'
      onMouseEnter={() => setIsHoveredFirst(true)}
      onMouseLeave={() => setIsHoveredFirst(false)}
    >
      <h1 className='mt-3' style={{ fontFamily: 'Montserrat', color: '#219C90', fontWeight: 'bold' }}>
        Installation Requests
      </h1>
      <div style={tableStyle}>
        <table className="table mt-5">
          <thead>
            <tr>
              <th>Requested at</th>
              <th>Request ID</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {batchdata.map((entry, index) => (
              <tr key={index}>
                <td>{formatCustomDate(entry.createdAt)}</td>
                <td>{entry.batchid}</td>
                <td style={{
                  color: entry.status === 'pending' ? '#FFA500' : entry.status === 'approved' ? 'green' : 'black',
                }}>
                  <strong>{entry.status}</strong>
                </td>
                <td>
                  {entry.status === 'approved' && (
                    <button className="btn btn-primary" onClick={() => toDetails(entry.batchid)}>
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

export default BatchTable;
