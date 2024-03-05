import { useCallback, useMemo } from "react";
import { ItemData } from "./Q6";
import Button from "./Button";

type ButtonListProps = {
  leftItems: ItemData[];
  rightItems: ItemData[];
  setLeftItems: React.Dispatch<React.SetStateAction<ItemData[]>>;
  setRightItems: React.Dispatch<React.SetStateAction<ItemData[]>>;
};

const ButtonList: React.FC<ButtonListProps> = ({
  leftItems,
  rightItems,
  setLeftItems,
  setRightItems,
}) => {
  const shiftAllRight = useCallback(() => {
    setRightItems((prev) => [...prev, ...leftItems]);
    setLeftItems([]);
  }, [leftItems]);

  const shiftAllLeft = useCallback(() => {
    setLeftItems((prev) => [...prev, ...rightItems]);
    setRightItems([]);
  }, [rightItems]);

  const isRightDisabled = useMemo(() => {
    return leftItems.some((item) => item.checked);
  }, [leftItems]);

  const isLeftDisabled = useMemo(() => {
    return rightItems.some((item) => item.checked);
  }, [rightItems]);

  const shiftRight = useCallback(() => {
    const checkedItems = leftItems.filter((item) => item.checked);
    const restLeftItems = leftItems.filter((item) => !item.checked);
    setRightItems((prev) => [...prev, ...checkedItems]);
    setLeftItems(restLeftItems);
  }, [leftItems]);

  const shiftLeft = useCallback(() => {
    const checkedItems = rightItems.filter((item) => item.checked);
    const restRightItems = rightItems.filter((item) => !item.checked);
    setLeftItems((prev) => [...prev, ...checkedItems]);
    setRightItems(restRightItems);
  }, [rightItems]);

  return (
    <div className="border border-t-black border-b-black flex flex-col justify-center gap-2 p-4">
      <Button onClick={shiftAllRight} disabled={leftItems.length === 0}>
        {">>"}
      </Button>
      <Button disabled={!isRightDisabled} onClick={shiftRight}>
        {">"}
      </Button>
      <Button disabled={!isLeftDisabled} onClick={shiftLeft}>
        {"<"}
      </Button>
      <Button onClick={shiftAllLeft} disabled={rightItems.length === 0}>
        {"<<"}
      </Button>
    </div>
  );
};

export default ButtonList;
