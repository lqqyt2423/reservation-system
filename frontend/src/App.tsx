import React from 'react';
import './App.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { Employee } from './Employee';
import { Guest, GuestEdit } from './Guest';

function App() {
  return (
    <div className="container-xl">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="guest">
            <Route index element={<Guest />} />
            <Route path=":id" element={<GuestEdit />} />
          </Route>
          <Route path="employee">
            <Route index element={<Employee />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Reservation System</h1>
      <nav>
        <ul>
          <li>
            <Link to="/guest">Guest Entry</Link>
          </li>
          <li>
            <Link to="/employee">Employee Entry</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
