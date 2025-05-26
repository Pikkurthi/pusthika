import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'All Books', to: '/books' },
  { label: 'Create Book', to: '/books/create' },
  { label: 'Manage Categories', to: '/categories' }

];

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-base-100 p-4 shadow-md hidden lg:block">
      <h1 className="text-2xl font-bold mb-6 text-primary">📘 Pustika Admin</h1>
      <ul className="menu space-y-2">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`btn btn-ghost justify-start ${
                pathname === item.to ? 'bg-primary text-white' : ''
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
