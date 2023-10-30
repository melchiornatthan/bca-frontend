import React, { useEffect, useState } from 'react';

function BatchTable({ batchdata, isAdmin }) {
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(batchdata);
    }, [batchdata]);

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
    const url = isAdmin ? `/admin/installationDetails?batchid=${batchid}` : `/installationDetails?batchid=${batchid}`;
    window.location.href = url;
  };

  return (
    <div
      style={{
        borderRadius: '17px',
        padding: '20px',
        boxShadow: isHovered ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
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
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{formatCustomDate(entry.createdAt)}</td>
                <td>{entry.batchid}</td>
                <td style={{
                  color: entry.status === 'pending' ? '#FFA500' : entry.status === 'approved' ? 'green' : 'black',
                }}>
                  <strong>{entry.status}</strong>
                </td>
                <td>
                  {(entry.status === 'approved' || isAdmin) && (
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
