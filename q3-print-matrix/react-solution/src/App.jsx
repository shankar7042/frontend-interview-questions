import { useState } from "react";
import "./App.css";
import Matrix from "./components/Matrix";

function createMatrix(rows, cols) {
  const newMatrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    newMatrix.push(row);
  }

  let direction = 0;
  let count = 0;
  let col = 0;
  while (count < rows * cols) {
    direction %= 3;
    // to down
    if (direction === 0) {
      for (let i = 0; i < rows; i++) {
        count++;
        newMatrix[i][col] = count;
      }
      direction++;
      col++;
    }

    // to right
    else if (direction === 1) {
      direction++;
    }

    // to up
    else if (direction === 2) {
      for (let i = rows - 1; i >= 0; i--) {
        count++;
        newMatrix[i][col] = count;
      }
      direction++;
      col++;
    }
  }
  return newMatrix;
}

function App() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [matrix, setMatrix] = useState(() => {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(0);
      }
      matrix.push(row);
    }
    return matrix;
  });

  const [isShow, setIsShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMatrix(createMatrix(rows, cols));
    setIsShow(true);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="rows">Rows</label>
          <input
            type="number"
            id="rows"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="cols">Columns</label>
          <input
            type="number"
            id="cols"
            value={cols}
            onChange={(e) => setCols(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {isShow && <Matrix matrix={matrix} />}
    </div>
  );
}

export default App;
