import React from 'react';


function SelectInstallation({ installationData }) {
  const tableStyle = {
    maxHeight: '600px',
    overflowY: 'auto',
  };

  const toRelocation = (id) => {
    window.location.href = '/relocationRequest?id=' + id + '';
  };

  return (
    <div
      className='text-center mx-auto px-5'
    >
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
                        <button className="btn btn-warning" onClick={() => toRelocation(entry.id)}>
                          Relocate
                        </button>
                      
                    </div>
                    <div className='col'>
                     
                        <button className="btn btn-danger">
                          Dismantle
                        </button>
                      
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
