import React from 'react';

import './Checkbox.css';


const Checkbox = ({ checked, onToggle }) => {
  return (
    <div className="Checkbox">
      <input
        checked={checked}
        onChange={onToggle}
        type="checkbox"
      />
    </div>
  );
};

Checkbox.defaultProps = {
  onToggle: () => {},
};

export default Checkbox;
