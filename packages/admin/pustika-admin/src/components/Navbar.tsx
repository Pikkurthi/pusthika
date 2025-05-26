import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-6">
      <div className="flex-1 text-xl font-semibold">Admin Dashboard</div>
      {/* <div className="flex items-center space-x-4">
        <button className="btn btn-sm btn-outline">Logout</button>
      </div> */}
    </div>
  );
};

export default Navbar;
