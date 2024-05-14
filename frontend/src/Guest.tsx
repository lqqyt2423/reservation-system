import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export function GuestEdit() {
  const { id } = useParams();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestContactInfo, setGuestContactInfo] = useState('');
  const [expectedArrivalTime, setExpectedArrivalTime] = useState('');
  const [reservedTableSize, setReservedTableSize] = useState(1);
  const [status, setStatus] = useState('');

  const getDetail = async () => {
    const resp = await fetch(`/api/reservations/${id}`);
    const result = await resp.json();
    if (resp.ok) {
      setGuestName(result.guestName);
      setGuestContactInfo(result.guestContactInfo);
      setExpectedArrivalTime(dayjs(result.expectedArrivalTime).format('YYYY-MM-DD'));
      setReservedTableSize(result.reservedTableSize);
      setStatus(result.status);
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const resp = await fetch(`/api/reservations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guestName, guestContactInfo, expectedArrivalTime, reservedTableSize }),
    });
    if (!resp.ok) {
      const result = await resp.json();
      let msg = 'error';
      if (result.message) {
        if (typeof result.message === 'string') {
          msg = result.message;
        } else {
          msg = JSON.stringify(result.message);
        }
      }
      setErrorMsg('Error: ' + msg);
    } else {
      setSuccessMsg('Update Successfully');
      getDetail();
    }
  };

  const onCancel = async () => {
    const resp = await fetch(`/api/reservations/${id}`, {
      method: 'DELETE',
    });
    if (!resp.ok) {
      const result = await resp.json();
      let msg = 'error';
      if (result.message) {
        if (typeof result.message === 'string') {
          msg = result.message;
        } else {
          msg = JSON.stringify(result.message);
        }
      }
      setErrorMsg('Error: ' + msg);
    } else {
      setSuccessMsg('Reservation Canceled');
      getDetail();
    }
  };

  return (
    <div>
      <p>
        <Link to="../">Add New Reservation</Link>
      </p>
      <h2>The Reservation Detail</h2>

      <div className="row mb-3">
        <div>
          <button className="btn btn-primary" onClick={onCancel}>
            Cancel Reservation
          </button>
        </div>
      </div>

      {!successMsg ? null : (
        <div className="row mt-3 text-success">
          <div>{successMsg}</div>
        </div>
      )}

      <div className="text-primary">
        <div>Status: {status}</div>
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <div className="row">
            <label className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <label className="col-sm-2 col-form-label">ContactInfo</label>
            <div className="col-sm-10">
              <input type="text" value={guestContactInfo} onChange={(e) => setGuestContactInfo(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <label className="col-sm-2 col-form-label">Expected Arrival Time</label>
            <div className="col-sm-10">
              <input type="date" value={expectedArrivalTime} onChange={(e) => setExpectedArrivalTime(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <label className="col-sm-2 col-form-label">Table Size</label>
            <div className="col-sm-10">
              <input type="number" value={reservedTableSize} onChange={(e) => setReservedTableSize(parseInt(e.target.value))} />
            </div>
          </div>
          {!errorMsg ? null : (
            <div className="row mt-3 text-danger">
              <div>{errorMsg}</div>
            </div>
          )}
          <div className="row mt-3">
            <div>
              <button type="submit" className="btn btn-primary">
                Update Reservation
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export function Guest() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestContactInfo, setGuestContactInfo] = useState('');
  const [expectedArrivalTime, setExpectedArrivalTime] = useState('');
  const [reservedTableSize, setReservedTableSize] = useState(1);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    const resp = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guestName, guestContactInfo, expectedArrivalTime, reservedTableSize }),
    });
    const result = await resp.json();
    if (!resp.ok) {
      let msg = 'error';
      if (result.message) {
        if (typeof result.message === 'string') {
          msg = result.message;
        } else {
          msg = JSON.stringify(result.message);
        }
      }
      setErrorMsg('Error: ' + msg);
    } else {
      navigate(result._id);
    }
  };

  return (
    <div>
      <h2>Reservation Table</h2>
      <form onSubmit={onSubmit}>
        <div>
          <div className="row">
            <label className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <label className="col-sm-2 col-form-label">ContactInfo</label>
            <div className="col-sm-10">
              <input type="text" value={guestContactInfo} onChange={(e) => setGuestContactInfo(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <label className="col-sm-2 col-form-label">Expected Arrival Time</label>
            <div className="col-sm-10">
              <input type="date" value={expectedArrivalTime} onChange={(e) => setExpectedArrivalTime(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <label className="col-sm-2 col-form-label">Table Size</label>
            <div className="col-sm-10">
              <input type="number" value={reservedTableSize} onChange={(e) => setReservedTableSize(parseInt(e.target.value))} />
            </div>
          </div>
          {!errorMsg ? null : (
            <div className="row mt-3 text-danger">
              <div>{errorMsg}</div>
            </div>
          )}
          <div className="row mt-3">
            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
