import React, { useState } from 'react';

const MultiCheckboxDropdown = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="multi-checkbox-dropdown">
      <button className="dropdown-toggle">
        {selectedOptions.length > 0
          ? `${selectedOptions.length} selected`
          : 'Select options'}
      </button>
      <ul className="dropdown-menu">
        {options.map((option) => (
          <li key={option}>
            <label>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionClick(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiCheckboxDropdown;
