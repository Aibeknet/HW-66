import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="d-flex align-items-center">
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loader;
