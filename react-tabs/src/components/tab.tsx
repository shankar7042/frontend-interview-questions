import { createContext, useContext, useEffect, useState } from "react";
import { cn } from "../utils";

const TabContext = createContext<{
  activeKey: string | null;
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
}>({
  activeKey: null,
  setActiveKey: () => {},
});

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeKey, setActiveKey] = useState<string>("");
  return (
    <TabContext.Provider value={{ activeKey, setActiveKey }}>
      {children}
    </TabContext.Provider>
  );
};

export const Tab = ({ children }: { children: React.ReactNode }) => {
  return <TabProvider>{children}</TabProvider>;
};

export const TabItem = ({
  children,
  id,
  active = false,
  className,
}: {
  children: React.ReactNode;
  id: string;
  active?: boolean;
  className?: string;
}) => {
  const { activeKey, setActiveKey } = useContext(TabContext);

  useEffect(() => {
    if (active) {
      setActiveKey(id);
    }
  }, [active]);

  const handleClick = () => {
    setActiveKey(id);
  };

  return (
    <div className="">
      <div
        className={cn(
          "cursor-pointer p-4 bg-slate-200 rounded-md",
          activeKey === id && "bg-purple-600 font-bold",
          className
        )}
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  );
};

export const TabContent = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const { activeKey } = useContext(TabContext);

  if (id !== activeKey) {
    return null;
  }

  return <div>{children}</div>;
};
