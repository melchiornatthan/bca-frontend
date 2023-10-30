import React, { useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminDismantleTable({ batchdata }) {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        setData(batchdata);
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

    const updateDismantle = async (id, installation_id) => {

        const confirmed = window.confirm('Are you sure you want to approve this request?');

        if (confirmed) {
            const body = {
                id: id,
                installation_id: installation_id,
            };
            const response = await axios.put(`http://localhost:3333/bca-app/update-dismantle`, body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('Request update successful');
                    }
                })
                .catch((error) => {
                    console.error('Error updating installation data:', error);
                });
                setData((installation) =>
                    installation.map((entry) =>
                    entry.id === id ? { ...entry, status: 'approved' } : entry
                    ));
        }
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
                            <th style={nonBoldCellStyle}>Location</th>
                            <th style={cellStyle}>Status</th>
                            <th style={cellStyle}>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((entry, index) => (
                        <tr key={index}>
                            <td style={nonBoldCellStyle}>{formatCustomDate(entry.createdAt)}</td>
                            <td style={nonBoldCellStyle}>{entry.installation.location}</td>
                            <td style={{
                                ...cellStyle,
                                color: entry.status === 'pending' ? '#FFA500' : (entry.status === 'approved' ? 'green' : 'black')
                            }}>
                                {entry.status}
                            </td>
                            <td>
                                {entry.status !== 'approved' && !entry.relocation_status && (
                                    <button className="btn btn-danger" onClick={() => updateDismantle(entry.id, entry.installation_id)}>
                                        Dismantle
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default AdminDismantleTable;
