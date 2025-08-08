import React from 'react';

export default function Dashboard() {
  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <i className='bx bx-bar-chart'></i>
        <h2>Recent Activity</h2>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="indicator leopard"></div>
          <div className="card-info">
            <strong>Leopard</strong> spotted in Zone A
            <span className="time-badge">12 min ago</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="indicator elephant"></div>
          <div className="card-info">
            <strong>Elephant</strong> migration detected
            <span className="time-badge">1 hour ago</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="indicator eagle"></div>
          <div className="card-info">
            <strong>New nest</strong> recorded for Himalayan Eagle
            <span className="time-badge">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}