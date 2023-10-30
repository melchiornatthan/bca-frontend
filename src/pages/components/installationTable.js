import React, { useState } from 'react';

function ClientInstallationDetails({ installationData }) {
  const tableStyle = {
    maxHeight: '600px',
    overflowY: 'auto',
  };
  const [isHoveredFirst, setIsHoveredFirst] = useState(false);

  return (
    <div
      className='text-center px-5 mx-auto'
    >
      <h1 style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>Batch Requests</h1>
      <div style={tableStyle}>
        <table className="table mt-3">
          <thead>
            <tr>
              <th style={{ fontFamily: 'Montserrat' }}>Location</th>
              <th style={{ fontFamily: 'Montserrat' }}>Address</th>
              <th style={{ fontFamily: 'Montserrat' }}>Branch PIC</th>
              <th style={{ fontFamily: 'Montserrat' }}>Area</th>
              <th style={{ fontFamily: 'Montserrat' }}>Communication</th>
              <th style={{ fontFamily: 'Montserrat' }}>Provider</th>
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
                <td style={{ fontFamily: 'Montserrat' }}>{entry.provider}</td>
                <td style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 'bold',
                  color: entry.status === 'pending' ? '#FFA500' : entry.status === 'approved' ? 'green' : 'black'
                }}>
                  {entry.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientInstallationDetails;