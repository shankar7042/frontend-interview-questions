import { Children } from "react";

export function CustomSwitch({ value, children }) {
  const cases = [];
  const defaults = [];
  Children.forEach(children, (child) => {
    if (child.type.name === "CustomCase") {
      if (typeof child.props.value === "function") {
        if (child.props.value(value)) {
          cases.push(child);
        }
      } else {
        if (child.props.value === value) {
          cases.push(child);
        }
      }
    } else if (child.type.name === "DefaultCase") {
      defaults.push(child);
    }
  });

  if (cases.length > 0) {
    return cases;
  }
  return defaults;
}

export function CustomCase({ children }) {
  return children;
}

export function DefaultCase({ children }) {
  return children;
}

// export function CustomSwitch({ value, children }) {
//   const [count, setCount] = useState(0);

//   return (
//     <ValueContext.Provider value={{ value, count, setCount }}>
//       {children}
//     </ValueContext.Provider>
//   );
// }

// export function CustomCase(props) {
//   const { value, count, setCount } = useContext(ValueContext);
//   let val = props.value;

//   if (typeof props.value === "function") {
//     val = props.value(value).toString();
//   }

//   useEffect(() => {
//     if (value === val) {
//       setCount((count) => count + 1);
//     }
//   }, []);

//   return count === 1 && value === val ? props.children : null;
// }

// export function DefaultCase({ children }) {
//   const { count } = useContext(ValueContext);
//   return count === 0 ? children : null;
// }
