import React, { useState } from "react";
import "./spinner_input.css";

export default function Spinner_input() {
  const [value, setValue] = useState(0);

  function handleInputChange(event) {
      setValue(event.target.value);
  }

  function handleKeyPress(event) {
      event.preventDefault(); // prevent changes to the value by typing
  }

  return (
    <>

    <input className="massnahmen_mc_page_c_c_element_updown" type="number"
                                value={value}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}></input>
    </>
  );
}




