import React, { useState } from "react";
import "./toggle_button.css";

export default function Toggle_button({ className }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className={`toggle-switch ${className}`}>
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="switch"></span>
    </label>
  );
}


