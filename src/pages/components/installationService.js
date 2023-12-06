import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import 'typeface-inter';
function InstallationService({ installationData, isAdminView }) {
  const [data, setData] = React.useState(installationData);
  const [hasPending, setHasPending] = React.useState(false);

  useEffect(() => {
    setData(installationData);
    setHasPending(installationData.some(entry => entry.status === 'pending'));
  }, [installationData]);

  useEffect(() => {
    console.log(hasPending);
  }, [hasPending]);


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
     <h1 style={{ fontFamily: 'inter', color: '#219C90', fontWeight: 'bold', fontSize: '6vh' }}>
        {isAdminView ? 'Service Requests' : 'Batch Requests'}
      </h1>
      <div style={tableStyle}>
        <table className="table mt-3">
          <thead>
            <tr>
              <th style={{ fontFamily: 'inter' }}>Location</th>
              <th style={{ fontFamily: 'inter' }}>Address</th>
              <th style={{ fontFamily: 'inter' }}>Branch PIC</th>
              <th style={{ fontFamily: 'inter' }}>Area</th>
              <th style={{ fontFamily: 'inter' }}>Communication</th>
              {(isAdminView || !hasPending ) && (
              <th style={{ fontFamily: 'inter' }}>Provider</th>
              )}
              {(isAdminView || !hasPending ) && (
              <th style={{ fontFamily: 'inter' }}>Status</th>
              )}
              {isAdminView && (
                <th style={{ fontFamily: 'inter' }}>Approve or Override</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td style={{ fontFamily: 'inter' }}>{entry.location}</td>
                <td style={{ fontFamily: 'inter' }}>{entry.address}</td>
                <td style={{ fontFamily: 'inter' }}>{entry.branch_pic}</td>
                <td style={{ fontFamily: 'inter' }}>{entry.area}</td>
                <td style={{ fontFamily: 'inter' }}>{entry.communication}</td>
                {(isAdminView || !hasPending ) && (
                <td style={{ fontFamily: 'inter' }}>{entry.provider}</td>
                )}
                 {(isAdminView || !hasPending ) && (
                <td style={{ fontFamily: 'inter' }}>{entry.status}</td>
                )}
                {isAdminView && (
                  <td>
                    <div className='row'>
                      <div className='col'>
                        {entry.status === 'pending' && (
                          <button
                            className="btn btn-success"
                            onClick={() => updateRequestStatus(entry.id)}
                          >
                            Approve
                          </button>
                        )}
                      </div> 
                      {(entry.status === 'pending' && entry.communication === 'VSAT') && (
                      <div className='col'>
                       
                          <button
                            className="btn btn-danger"
                            onClick={() => toDetails(entry.id)}
                          >
                            Override
                          </button>
                        
                      </div>
                      )}
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
