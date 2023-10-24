import { useState } from "react";

// import button data
import {
  numberButtons,
  operatorButtons,
  clearButtons,
} from "./buttons";

// import the function that determines the display value based on inputs and stored values
import handleClick from "./logic";



function Calculator() {
  // sets a value to be displayed on the calculator screen. Defaults to 0. Can be updated with React state hook
  const [mainDisplay, setMainDisplay] = useState(0);

// defines what an individual button (of any type) looks like. 
  const Button = (buttonID) => {
    // Creates a jsx element with a unique id and class based on the button type for each button
    return (
        <button
          key={buttonID.id}
          id={buttonID.id}
          className={buttonID.class}
          // gives each button the ability to update the calculator's display screen by calling the imported "handleClick" function.
          onClick={() => {
            setMainDisplay(handleClick(buttonID.id));
          }}
        >
          {/* displays the name/symbol for each button on the user interface */}
          {buttonID.name}
        </button>
    );
  };
  // creates a button section. The calulator will contain three button sections: numbers, operators and clear. These sections are separated for the purpose of layout/styling rather than calculator logic
  const ButtonSection = ({ buttonData, id }) => {
    return (
      <div id={id} className="buttons">
        {/* takes the button section data array maps the array creating a jsx Button element for each item in the array */}
        {buttonData.map((button) => Button(button))}
      </div>
    );
  };

  // defines the overall layout of the calculator element, creating an HTML element for the brand name at the top, display below it and the buttons below that inside a buttons container. Inside the container are the three button sections, which will be individually styled.
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
