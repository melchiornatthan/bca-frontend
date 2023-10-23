import React from 'react';

import axios from 'axios';

function AdminBatchTable({ batchdata }) {
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
        window.location.href = '/admin/installationDetails?batchid='+batchid+'';
     
  };

  return (
    <div className='text-center w-75 mx-auto'>
      <h1 style={{ fontFamily: 'Montserrat' }}>Service Requests</h1>
      <div style={tableStyle}>
        <table className="table mt-3">
          <thead>
            <tr>
              <th style={{ fontFamily: 'Montserrat' }}>Requested at</th>
              <th style={{ fontFamily: 'Montserrat' }}>Request ID</th>
              <th style={{ fontFamily: 'Montserrat' }}>Status</th>
              <th style={{ fontFamily: 'Montserrat' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {batchdata.map((entry, index) => (
              <tr key={index}>
                <td style={{ fontFamily: 'Montserrat' }}>{formatCustomDate(entry.createdAt)}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.batchid}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.status}</td>
                <td>
                      <button className="btn btn-primary" onClick={() => toDetails(entry.batchid)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBatchTable;
