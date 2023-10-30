import React from 'react';

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

function InstallationReqTable({ installationData }) {
  const tableStyle = {
    maxHeight: '600px',
    overflowY: 'auto',
  };

  return (
    <div className='text-center w-75 mx-auto'>
      <h1 style={{ fontFamily: 'Montserrat' }}>Service Requests</h1>
      <div style={tableStyle}>
        <table className="table mt-3">
          <thead>
            <tr>
              <th style={{ fontFamily: 'Montserrat' }}>Location</th>
              <th style={{ fontFamily: 'Montserrat' }}>Address</th>
              <th style={{ fontFamily: 'Montserrat' }}>Branch PIC</th>
              <th style={{ fontFamily: 'Montserrat' }}>Area</th>
              <th style={{ fontFamily: 'Montserrat' }}>Communication</th>
              <th style={{ fontFamily: 'Montserrat' }}>Status</th>
              {/* <th style={{ fontFamily: 'Montserrat' }}>Details</th> New column for the Details button */}
            </tr>
          </thead>
          <tbody>
            {installationData.map((entry, index) => (
              <tr key={index}>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.location}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.address}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.branch_pic}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.area}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.communication}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InstallationReqTable;
