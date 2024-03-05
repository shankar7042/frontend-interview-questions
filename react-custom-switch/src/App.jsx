import "./App.css";
import { CustomCase, CustomSwitch, DefaultCase } from "./Switch";

function App() {
  return (
    <>
      <h1>Hello</h1>
      <CustomSwitch value="1000">
        <CustomCase value={(e) => e < 10}>
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "rebeccapurple",
            }}
          >
            Hello 20
          </div>
        </CustomCase>
        <CustomCase value="20">Hello 20</CustomCase>
        <CustomCase value="30">Hello 30</CustomCase>
        <CustomCase value="1000">
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "red",
            }}
          >
            Hello from this 1000
          </div>
        </CustomCase>
        <DefaultCase>Hello Default case</DefaultCase>
      </CustomSwitch>
    </>
  );
}

export default App;
