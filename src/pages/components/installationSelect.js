import React, { useState } from 'react';
import axios from 'axios';

function SelectInstallation({ installationData }) {
  const [pendingDismantleIds, setPendingDismantleIds] = useState([]); // State to track pending dismantle requests

  const tableStyle = {
    maxHeight: '600px',
    overflowY: 'auto',
  };

  const toRelocation = (id) => {
    window.location.href = '/relocationRequest?id=' + id + '';
  };

  const deleteInstallation = async (id) => {
    const confirmed = window.confirm('Are you sure you want to approve this request?');

    if (confirmed) {
      const body = {
        installation_id: id,
      };

      try {
        const dismantleReq = await axios.post(`http://localhost:3333/bca-app/dismantle-request`, body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        // If the request is successful, add the id to the pendingDismantleIds array
        setPendingDismantleIds((prevIds) => [...prevIds, id]);
      } catch (error) {
        console.error('Dismantle request failed', error);
      }
    }
  };

  return (
    <div className='text-center mx-auto px-5'>
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
              <th style={{ fontFamily: 'Montserrat' }}>Relocate or Dismantle</th>
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
                <td>
                  <div className='row'>
                    <div className='col'>
                      {entry.relocation_status ? (
                        'Pending'
                      ) : (
                        <button className="btn btn-warning" onClick={() => toRelocation(entry.id)}>
                          Relocate
                        </button>
                      )}
                    </div>
                    <div className='col'>
                      {entry.dismantle_status || pendingDismantleIds.includes(entry.id) ? (
                        'Pending'
                      ) : (
                        <button className="btn btn-danger" onClick={() => deleteInstallation(entry.id)}>
                          Dismantle
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SelectInstallation;
