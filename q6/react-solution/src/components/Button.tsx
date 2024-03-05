type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button
      className="bg-blue-600 px-4 py-2 rounded-md text-lg font-bold shadow-2xl hover:bg-blue-500 disabled:bg-neutral-600 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
