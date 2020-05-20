import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <h2>URL-Shortener</h2>
        <div className="button">
          <Link
            to="/category"
            class="btn btn-secondary btn-lg active"
            role="button"
            aria-pressed="true">
            Manage category
          </Link>
        </div>
      </nav>
    </>
  );
}
