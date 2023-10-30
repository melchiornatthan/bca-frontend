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
    window.location.href = '/admin/installationDetails?batchid=' + batchid + '';
  };

  const cellStyle = {
    fontFamily: 'Montserrat',
    fontWeight: 'bold', // Make the text bold by default
  };

  const nonBoldCellStyle = {
    fontFamily: 'Montserrat',
    fontWeight: 'normal', // Make the text not bold
  };

  return (
    <div className='text-center w-75 mx-auto'>
      <h1 style={{ fontFamily: 'Montserrat' }}>Service Requests</h1>
      <div style={tableStyle}>
        <table className="table mt-3">
          <thead>
            <tr>
              <th style={nonBoldCellStyle}>Requested at</th>
              <th style={nonBoldCellStyle}>Request ID</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Details</th>
            </tr>
          </thead>
          <tbody>
            {batchdata.map((entry, index) => (
              <tr key={index}>
                <td style={nonBoldCellStyle}>{formatCustomDate(entry.createdAt)}</td>
                <td style={nonBoldCellStyle}>{entry.batchid}</td>
                <td style={{
                  ...cellStyle,
                  color: entry.status === 'pending' ? '#FFA500' : (entry.status === 'approved' ? 'green' : 'black')
                }}>
                  {entry.status}
                </td>
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
