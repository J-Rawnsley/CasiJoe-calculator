import { useState } from "react";
import {
  /* ButtonSection, */ numberButtons,
  operatorButtons,
  clearButtons,
} from "./buttons";
import handleClick from "./logic";
// import { displayVal } from "./logic"

function Calculator() {
  const [mainDisplay, setMainDisplay] = useState(0);

  const Button = (buttonID) => {
    return (
      <>
        <button
          id={buttonID.id}
          className={buttonID.class}
          onClick={() => {
            setMainDisplay(handleClick(buttonID.id));
          }}
        >
          {buttonID.name}
        </button>
      </>
    );
  };

  const ButtonSection = ({ buttonData, id }) => {
    return (
      <div id={id} className="buttons">
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
