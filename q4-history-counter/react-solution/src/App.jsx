import { PureComponent, useCallback, useState } from "react";
import "./App.css";

const ADD = "ADD";
const SUBTRACT = "SUBTRACT";
const MULTIPLY = "MULTIPLY";
const DIVIDE = "DIVIDE";

function App() {
  const [value, setValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [pointer, setPointer] = useState(-1);

  const handleOperationCick = useCallback(
    (operator, val) => {
      let newVal = value;
      let operationStr = "";
      switch (operator) {
        case ADD:
          newVal += val;
          operationStr = `+${val}`;
          break;
        case SUBTRACT:
          newVal -= val;
          operationStr = `-${val}`;
          break;
        case MULTIPLY:
          newVal *= val;
          operationStr = `x${val}`;
          break;
        case DIVIDE:
          newVal /= val;
          operationStr = `/${val}`;
          break;
      }
      let historyObj = {
        operation: operationStr,
        old: value,
        new: newVal,
      };
      setValue(newVal);
      setHistory([...history, historyObj]);
      setPointer((prev) => prev + 1);
    },
    [value, history]
  );

  return (
    <div>
      <h1>pointer: {pointer}</h1>
      <div className="container">
        <div className="btn-wrapper">
          <button
            className="btn"
            disabled={pointer === -1}
            onClick={() => {
              let currPointer = pointer;
              setPointer((prev) => prev - 1);
              setValue(history[currPointer - 1].new);
            }}
          >
            Undo
          </button>
          <button
            className="btn"
            disabled={pointer === -1 || pointer === history.length - 1}
            onClick={() => {
              let currPointer = pointer;
              setPointer((prev) => prev + 1);
              setValue(history[currPointer + 1].new);
            }}
          >
            Redo
          </button>
          <button className="btn">Reset</button>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="btn-wrapper">
          <button
            className="btn"
            onClick={() => handleOperationCick(DIVIDE, 2)}
          >
            /2
          </button>
          <button
            className="btn"
            onClick={() => handleOperationCick(SUBTRACT, 1)}
          >
            -1
          </button>
        </div>
        <h2 className="content">{value}</h2>
        <div className="btn-wrapper">
          <button className="btn" onClick={() => handleOperationCick(ADD, 1)}>
            +1
          </button>
          <button
            className="btn"
            onClick={() => handleOperationCick(MULTIPLY, 2)}
          >
            x2
          </button>
        </div>
      </div>
      <hr />
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Old</th>
              <th>New</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 &&
              history.map((obj, ind) => {
                if (ind <= pointer) {
                  return (
                    <tr key={ind}>
                      <td>{obj.operation}</td>
                      <td>{obj.old}</td>
                      <td>{obj.new}</td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
