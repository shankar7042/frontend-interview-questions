import { useCallback, useMemo, useState } from "react";
import ItemList2 from "./ItemList2";
import Button from "./Button";

type Item = string;

const leftSideItems: Item[] = ["HTML", "JavaScript", "CSS", "TypeScript"];
const rightSideItems: Item[] = ["React", "Angular", "Vue", "Svelte"];

export type ItemData = {
  label: string;
  checked: boolean;
};

const Q6FollowUp = () => {
  const [leftItems, setLeftItems] = useState<ItemData[]>(() => {
    return leftSideItems.map((item) => ({ label: item, checked: false }));
  });
  const [rightItems, setRightItems] = useState<ItemData[]>(() => {
    return rightSideItems.map((item) => ({ label: item, checked: false }));
  });

  const isRightDisabled = useMemo(() => {
    return leftItems.some((item) => item.checked);
  }, [leftItems]);

  const isLeftDisabled = useMemo(() => {
    return rightItems.some((item) => item.checked);
  }, [rightItems]);

  const shiftRight = useCallback(() => {
    const checkedItems = leftItems.filter((item) => item.checked);
    const restLeftItems = leftItems.filter((item) => !item.checked);
    setRightItems([...rightItems, ...checkedItems]);
    setLeftItems(restLeftItems);
  }, [leftItems, rightItems]);

  const shiftLeft = useCallback(() => {
    const checkedItems = rightItems.filter((item) => item.checked);
    const restRightItems = rightItems.filter((item) => !item.checked);
    setLeftItems([...leftItems, ...checkedItems]);
    setRightItems(restRightItems);
  }, [leftItems, rightItems]);

  return (
    <div className="min-h-screen flex justify-center items-center w-[70%] mx-auto">
      <div className="my-8 flex shadow-2xl rounded-xl w-full bg-gray-200">
        <ItemList2 items={leftItems} setItems={setLeftItems} />
        <div className="flex flex-col gap-8 p-8">
          <Button disabled={!isRightDisabled} onClick={shiftRight}>
            {">"}
          </Button>
          <Button disabled={!isLeftDisabled} onClick={shiftLeft}>
            {"<"}
          </Button>
        </div>
        <ItemList2 items={rightItems} setItems={setRightItems} />
      </div>
    </div>
  );
};

export default Q6FollowUp;
