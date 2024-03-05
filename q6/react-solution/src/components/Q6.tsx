import { useState } from "react";
import ButtonList from "./ButtonList";
import ItemList from "./ItemList";

type Item = string;

const leftSideItems: Item[] = ["HTML", "JavaScript", "CSS", "TypeScript"];
const rightSideItems: Item[] = ["React", "Angular", "Vue", "Svelte"];

export type ItemData = {
  label: string;
  checked: boolean;
};

const Q6 = () => {
  const [leftItems, setLeftItems] = useState<ItemData[]>(() => {
    return leftSideItems.map((item) => ({ label: item, checked: false }));
  });
  const [rightItems, setRightItems] = useState<ItemData[]>(() => {
    return rightSideItems.map((item) => ({ label: item, checked: false }));
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex">
        <ItemList items={leftItems} setItems={setLeftItems} />
        <ButtonList
          leftItems={leftItems}
          rightItems={rightItems}
          setLeftItems={setLeftItems}
          setRightItems={setRightItems}
        />
        <ItemList items={rightItems} setItems={setRightItems} />
      </div>
    </div>
  );
};

export default Q6;
