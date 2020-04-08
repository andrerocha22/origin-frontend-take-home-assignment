import * as React from 'react';
import "./styles.scss"

const ValueInput: React.FC = () => {
  return (
    <div>
      <label>Total amount</label>
      <span className="valueInput">
        <span className="currencyIcon">$</span>
        <input />
      </span>
    </div>
  );
};

export default ValueInput;
