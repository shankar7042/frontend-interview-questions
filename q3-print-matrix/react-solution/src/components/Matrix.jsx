const Matrix = ({ matrix }) => {
  return (
    <table
      cellSpacing={0}
      style={{ border: "1px solid", margin: "1em auto", textAlign: "center" }}
    >
      <tbody>
        {matrix.map((row) => (
          <tr key={(Math.random() + 1).toString(36).substring(2)}>
            {row.map((number) => (
              <td
                key={(Math.random() + 1).toString(36).substring(2)}
                style={{
                  border: "1px solid",
                  padding: "0.5em",
                  margin: "auto",
                }}
              >
                {number}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Matrix;
