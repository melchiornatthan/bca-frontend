import React from 'react';
import axios from 'axios';

function InstallationService({ installationData, isAdminView }) {
  const [data, setData] = React.useState(installationData);

  React.useEffect(() => {
    setData(installationData);
  }, [installationData]);

  const tableStyle = {
    maxHeight: '600px',
    overflowY: 'auto',
  };

  const toDetails = (id) => {
    // Handle navigation logic here based on isAdminView prop
    if (isAdminView) {
      // Redirect to admin override page
      window.location.href = '/admin/installationOverride?id=' + id + '';
    } else {
      // Redirect to user details page
      // Add logic for user details navigation here
    }
  };

  const updateRequestStatus = async (id) => {
    const confirmed = window.confirm('Are you sure you want to approve this request?');

    if (confirmed) {
      try {
        // Update the request status based on the context
        const response = await axios.put(
          isAdminView
            ? `http://localhost:3333/bca-app/update-installations/${id}`
            : `http://localhost:3333/user-app/update-installations/${id}`
        );

        console.log(response.status);

        // Update the data based on the context
        setData((installation) =>
          installation.map((entry) =>
            entry.id === id ? { ...entry, status: 'approved' } : entry
          )
        );
      } catch (error) {
        console.error('Error updating installation data:', error);
      }
    }
  };

  return (
    <div className='text-center w-75 mx-auto'>
      <h1 style={{ fontFamily: 'Montserrat' }}>
        {isAdminView ? 'Service Requests' : 'Batch Requests'}
      </h1>
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
              {isAdminView && (
                <th style={{ fontFamily: 'Montserrat' }}>Approve or Override</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.location}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.address}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.branch_pic}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.area}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.communication}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.provider}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{entry.status}</td>
                {isAdminView && (
                  <td>
                    <div className='row'>
                      <div className='col'>
                        {entry.status !== 'approved' && (
                          <button
                            className="btn btn-success"
                            onClick={() => updateRequestStatus(entry.id)}
                          >
                            Approve
                          </button>
                        )}
                      </div>
                      <div className='col'>
                        {entry.status !== 'approved' && (
                          <button
                            className="btn btn-danger"
                            onClick={() => toDetails(entry.id)}
                          >
                            Override
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InstallationService;
