import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SelectInstallation({ installationData }) {
  const [installations, setInstallations] = useState([]); // State to store installation data

  const tableStyle = {
    maxHeight: '600px',
    overflowY: 'auto',
  };

  useEffect(() => {
   setInstallations(installationData);
  }, [installationData]);

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
        await axios.post(`http://localhost:3333/bca-app/dismantle-request`, body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      } catch (error) {
        console.error('Dismantle request failed', error);
      }
      setInstallations((installation) =>
          installation.map((entry) =>
            entry.id === id ? { ...entry, dismantle_status: true } : entry
          )
        );
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
            {installations.map((entry, index) => (
              <tr key={index}>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.location}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.address}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.branch_pic}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.area}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.communication}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.provider}</td>
                <td>
                  {entry.relocation_status ? (
                    'Relocation Pending'
                  ) : entry.dismantle_status ? (
                    'Dismantle Pending'
                  ) : (
                    <div className='row'>
                      <div className='col'>
                        <button className="btn btn-warning" onClick={() => toRelocation(entry.id)}>
                          Relocate
                        </button>
                      </div>
                      <div className='col'>
                        <button className="btn btn-danger" onClick={() => deleteInstallation(entry.id)}>
                          Dismantle
                        </button>
                      </div>
                    </div>
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

export default SelectInstallation;
