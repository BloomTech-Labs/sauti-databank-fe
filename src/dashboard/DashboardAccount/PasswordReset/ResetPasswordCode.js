import React, { useState, useRef } from "react";
import { ResetPasswordCodeStyles } from "../../styledComponents/DashAccount";

// Code Verification
// Numbers entered into input adds onto the finalCode state, if deleted it removes them
// Verify button checks finalCode only
// If code doesnt match, isn't 5 numbers, etc, it pops up an error.

const ResetPasswordCode = ({ length, label, loading, onComplete }) => {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef([]);

  const processInput = (event, slot) => {
    const num = event.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }

    if (newCode.every(num => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  return (
    <ResetPasswordCodeStyles>
      <div className="code-container">
        <div className="code-container-header">
          <h1>{label}</h1>
        </div>
        <div className="code-container-number-container">
          {code.map((num, idx) => {
            return (
              <input
                placeholder="0"
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={num}
                autoFocus={!code[0].length && idx === 0}
                readOnly={loading}
                onChange={e => processInput(e, idx)}
                onKeyUp={e => onKeyUp(e, idx)}
                ref={ref => inputs.current.push(ref)}
              />
            );
          })}
        </div>
      </div>
    </ResetPasswordCodeStyles>
  );
};

export default ResetPasswordCode;
