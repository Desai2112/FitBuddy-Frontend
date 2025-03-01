import React from 'react';
import PropTypes from 'prop-types';

const PageWrapper = ({ title, children }) => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <div className="h-1 w-20 bg-primary-500 mt-2 rounded-full"></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        {children}
      </div>
    </div>
  );
};

PageWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageWrapper; 