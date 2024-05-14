import { gql, useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import React, { useState } from 'react';

interface Reservation {
  _id: string;
  guestName: string;
  guestContactInfo: string;
  expectedArrivalTime: string;
  reservedTableSize: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

const GET_RESERVATIONS = gql`
  query getReservations($status: String, $expectedArrivalTime: DateTime) {
    reservations(status: $status, expectedArrivalTime: $expectedArrivalTime) {
      _id
      guestName
      guestContactInfo
      expectedArrivalTime
      reservedTableSize
      status
      createdAt
    }
  }
`;

const CONFIRM_RESERVATION = gql`
  mutation confirmReservation($id: String!) {
    confirmReservation(id: $id) {
      _id
    }
  }
`;

const CANCEL_RESERVATION = gql`
  mutation cancelReservation($id: String!) {
    cancelReservation(id: $id) {
      _id
    }
  }
`;

export function Employee() {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [expectedArrivalTime, setExpectedArrivalTime] = useState<string | undefined>(undefined);
  const { loading, error, data } = useQuery<{ reservations: Reservation[] }>(GET_RESERVATIONS, {
    variables: { status: status || undefined, expectedArrivalTime: expectedArrivalTime || undefined },
  });

  const [confirmReservation] = useMutation(CONFIRM_RESERVATION, { refetchQueries: [GET_RESERVATIONS] });
  const [cancelReservation] = useMutation(CANCEL_RESERVATION, { refetchQueries: [GET_RESERVATIONS] });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h2>Reservation List</h2>
      <div className="mb-3">
        <label style={{ marginRight: '20px' }}>Filter Expected Arrival Time:</label>
        <input type="date" value={expectedArrivalTime} onChange={(e) => setExpectedArrivalTime(e.target.value)} />
      </div>
      <div className="mb-3">
        <select
          style={{ width: '150px' }}
          value={status}
          className="form-select"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="">Filter Status</option>
          <option value="pending">pending</option>
          <option value="confirmed">confirmed</option>
          <option value="cancelled">cancelled</option>
        </select>
      </div>

      {data && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Reservation At</th>
              <th scope="col">Guest Name</th>
              <th scope="col">Guest Contact Info</th>
              <th scope="col">Expected Arrival Time</th>
              <th scope="col">Table Size</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.reservations.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item._id}</td>
                <td>{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>{item.guestName}</td>
                <td>{item.guestContactInfo}</td>
                <td>{dayjs(item.expectedArrivalTime).format('YYYY-MM-DD')}</td>
                <td>{item.reservedTableSize}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === 'pending' ? (
                    <>
                      <button
                        className="me-1 btn btn-primary btn-sm"
                        onClick={() => {
                          confirmReservation({ variables: { id: item._id } });
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          cancelReservation({ variables: { id: item._id } });
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
