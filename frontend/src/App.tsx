import React from 'react';
import './App.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="guest" element={<Guest />} />
          <Route path="employee" element={<Employee />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <h1>Reservation System</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/guest">Guest</Link>
          </li>
          <li>
            <Link to="/employee">Employee</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Guest() {
  return (
    <div>
      <h2>Guest</h2>
    </div>
  );
}

function Employee() {
  return (
    <div>
      <h2>Employee</h2>
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
