// import React from 'react';
import PropTypes from 'prop-types';

const ServiceCard = ({ title }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
      <div style={{ width: '200px', height: '100px', border: '1px solid #000', marginBottom: '0.5rem' }}>
        200 x 100
      </div>
      <p>{title}</p>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ServiceCard;
