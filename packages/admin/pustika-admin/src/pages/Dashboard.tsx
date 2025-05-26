import React, { useEffect, useState } from 'react';
import { getDashboardMetrics } from '../services/bookService';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {

  const [metrics, setMetrics] = useState({ totalBooks: 0, totalPages: 0 });

  useEffect(() => {
    getDashboardMetrics()
      .then(setMetrics)
      .catch(() => alert('Failed to load dashboard metrics'));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title">Total Books</h2>
          <p className="text-4xl font-bold">{metrics.totalBooks}</p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title">Total Pages</h2>
          <p className="text-4xl font-bold">{metrics.totalPages}</p>
        </div>
      </div>

      <div className="col-span-full flex space-x-4 mt-4">
        <Link to="/books" className="btn btn-primary">View All Books</Link>
        <Link to="/books/create" className="btn btn-secondary">+ Create New Book</Link>
      </div>
    </div>
  );
};

export default Dashboard;
