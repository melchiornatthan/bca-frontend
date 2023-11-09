import React, { useState } from 'react';
import { useEffect } from 'react';

function RelocationByBatchIdTable({ batchdata, isAdmin = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);
    const [hasPending, setHasPending] = useState(false);
  const tableStyle = {
    maxHeight: '600px',
    overflowY: 'auto',
  };

  useEffect(() => {
    setData(batchdata);
    setHasPending(batchdata.some(entry => entry.status === 'pending'));
  }, [batchdata]);

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
      <h2>Submitted Requests</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Old Location</th>
                    <th>New Location</th>
                    <th>New Address</th>
                    <th>New Area</th>
                    <th>New Branch PIC</th>
                    <th>New Communication</th>
                    {(isAdmin || !hasPending ) && (
                    <th>Status</th>
                    )}
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((request, index) => (
                    <tr key={index}>
                      <td>{request.old_location}</td>
                      <td>{request.new_location}</td>
                      <td>{request.new_address}</td>
                      <td>{request.new_area}</td>
                      <td>{request.new_branch_pic}</td>
                      <td>{request.new_communication}</td>
                      {(isAdmin || !hasPending ) && (
                       <td style={{
                        color: request.status === 'pending' ? '#FFA500' : request.status === 'approved' ? 'green' : 'black',
                      }}>{request.status}</td>
                      )}
                  <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => toDetails(request.id)}
                          >
                            Details
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

export default RelocationByBatchIdTable;