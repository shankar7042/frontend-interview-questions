import { useState } from "react";
import "./App.css";
import { list } from "./list";
import CheckBox from "./components/CheckBox";

export type ListItem = {
  id: string;
  name: string;
  checked: boolean;
};

function App() {
  const [listItems, setListItems] = useState<ListItem[]>(() => {
    return list.map((li) => ({
      ...li,
      id: crypto.randomUUID(),
      checked: false,
    }));
  });

  const handleSelectAll = (checked: boolean) => {
    const newListItems: ListItem[] = listItems.map((item) => ({
      ...item,
      checked,
    }));
    setListItems(newListItems);
  };

  const handleChange = (id: string, checked: boolean) => {
    const newListItems: ListItem[] = listItems.map((item) =>
      item.id === id ? { ...item, checked } : item
    );
    setListItems(newListItems);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-400">
      <div className="w-[30%] flex flex-col rounded-md shadow-md overflow-hidden">
        <CheckBox
          id={crypto.randomUUID()}
          label="Select All"
          checked={listItems.every((item) => item.checked) ? true : false}
          onChange={(checked) => handleSelectAll(checked)}
          className="px-4 py-4 bg-neutral-300"
        />

        <form className="bg-neutral-50 px-4 py-3">
          {listItems.map((item) => (
            <CheckBox
              key={item.id}
              id={item.id}
              label={item.name}
              checked={item.checked}
              onChange={(checked) => handleChange(item.id, checked)}
              className="mb-3"
            />
          ))}
        </form>
      </div>
    </div>
  );
}

export default App;
