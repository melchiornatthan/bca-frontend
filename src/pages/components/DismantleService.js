import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DismantleService({ batchdata, isAdmin }) {
  const [isHoveredFirst, setIsHoveredFirst] = useState(false);
  const [dismantleData, setDismantleData] = useState([]);

    useEffect(() => {
        setDismantleData(batchdata);
    }, [batchdata]);

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

  const toDetails = (id) => {
    window.location.href = `/dismantleDetails?id=${id}`;
  };

  const updateDismantle = async (id, installation_id) => {
    if (isAdmin) {
      const confirmed = window.confirm('Are you sure you want to approve this request?');

      if (confirmed) {
        const body = {
          id: id,
          installation_id: installation_id,
        };
        const response = await axios.put('http://localhost:3333/bca-app/update-dismantle', body, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          toast.success('Request update successful');
        }
        setDismantleData((dismantle) =>
            dismantle.map((entry) => (entry.id === id ? { ...entry, status: 'approved' } : entry))
            );
      }
    }
  };

  return (
    <div
      style={{
        borderRadius: '17px',
        padding: '20px',
        boxShadow: isHoveredFirst ? '10px 10px 20px rgba(33, 156, 144, 0.3)' : 'none',
        transition: 'box-shadow 0.5s',
      }}
      onMouseEnter={() => setIsHoveredFirst(true)}
      onMouseLeave={() => setIsHoveredFirst(false)}
      className="text-center w-75 mx-auto px-5"
    >
      <div style={tableStyle}>
        <table className="table">
          <thead>
            <tr>
              <th>Requested at</th>
              <th>Request ID</th>
              <th>Location</th>
              <th>Status</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {dismantleData.map((entry, index) => (
              <tr key={index}>
                <td>{formatCustomDate(entry.createdAt)}</td>
                <td>{entry.id}</td>
                <td>{entry.location}</td>
                <td style={{
                  color: entry.status === 'pending' ? '#FFA500' : entry.status === 'approved' ? 'green' : 'black',
                }}>
                  <strong>{entry.status}</strong>
                </td>
                {isAdmin && (
                  <td>
                    {entry.status !== 'approved' && !entry.relocation_status && (
                      <button className="btn btn-danger" onClick={() => updateDismantle(entry.id, entry.installation_id)}>
                        Dismantle
                      </button>
                    )}
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

export default DismantleService;
