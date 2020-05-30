import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <h2>URL-Shortener</h2>
        <div className="d-flex justify-content-end">
          <div className="button mr-3">
            <Link
              className="btn btn-secondary btn-lg active"
              role="button"
              aria-pressed="true"
              to="/report">
              Report
            </Link>
          </div>
          <div className="button">
            <Link
              className="btn btn-secondary btn-lg active"
              role="button"
              aria-pressed="true"
              to={pathname === '/' ? '/category' : '/'}>
              {pathname === '/' ? 'Manage category' : 'Manage Link'}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
