import React from 'react';

import './BookingsControls.css';

const bookingsControl = props => {
  return (
    <div className="bookings-control">
      <button
        className={props.activeOutputType === 'list' ? 'active' : ''}
        onClick={props.onChange.bind(this, 'list')}
      >
        List
      </button>
      <p
      >
        Chart / in the future
      </p>
    </div>
  );
};

export default bookingsControl;