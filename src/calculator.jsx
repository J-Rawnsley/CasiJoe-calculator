import { useState } from "react";

import {
  numberButtons,
  operatorButtons,
  clearButtons,
} from "./buttons";

import handleClick from "./logic";


function Calculator() {
  const [mainDisplay, setMainDisplay] = useState(0);   // value to be displayed on the calculator screen.

// defines what an individual button (of any type) looks like. 
  const Button = (buttonID) => {

    // Creates a jsx element with a unique id and class based on the button type for each button
    return (
        <button
          key={buttonID.id}
          id={buttonID.id}
          className={buttonID.class}
          onClick={() => {
            setMainDisplay(handleClick(buttonID.id));
          }}
        >
          {buttonID.name /* displays the name/symbol for each button on the user interface */ }
        </button>
    );
  };
  // creates one of the three button sections
  const ButtonSection = ({ buttonData, id }) => {
    return (
      <div id={id} className="buttons">
        {/* takes the button section data array maps the array creating a jsx Button element for each item in the array */}
        {buttonData.map((button) => Button(button))}
      </div>
    );
  };

  return (
    <div className="calculator">
      <div className="brandName">CasiJoe</div>
      <div className="display">{mainDisplay}</div>
      <div className="buttonsContainer">
        <ButtonSection buttonData={numberButtons} id="numberButtons" />
        <ButtonSection buttonData={operatorButtons} id="operatorButtons" />
        <ButtonSection buttonData={clearButtons} id="clearButtons" />
      </div>
    </div>
  );
}

export default Calculator;
