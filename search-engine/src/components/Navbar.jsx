import React from 'react';

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">ZYTHERION BIOVANC</h1>
      <div className="nav-content">
        <ul className="nav-links">
          <li><a href="/about.html">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><i className='bx bx-user-circle'></i></li>
          <li><i className='bx bx-menu-alt-right'></i></li>
        </ul>
      </div>
    </div>
  );
}