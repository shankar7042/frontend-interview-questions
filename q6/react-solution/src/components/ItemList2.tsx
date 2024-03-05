import { useCallback, useEffect, useMemo, useState } from "react";
import { ItemData } from "./Q6";

type ItemList2Props = {
  items: ItemData[];
  setItems: React.Dispatch<React.SetStateAction<ItemData[]>>;
};

const ItemList2: React.FC<ItemList2Props> = ({ items, setItems }) => {
  const [inputVal, setInputVal] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const count = items.reduce((acc, item) => acc + (item.checked ? 1 : 0), 0);
    console.log({ count, items });

    if (count === items.length) {
      if (count === 0) {
        setCheck(false);
      } else {
        setCheck(true);
      }
    } else {
      setCheck(false);
    }
  }, [items]);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputVal !== "") {
      const newItem: ItemData = { label: inputVal, checked: false };
      setItems((prev) => [...prev, newItem]);
      setInputVal("");
    }
  };

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheck(true);
      setItems((items) =>
        items.map((item) => ({
          label: item.label,
          checked: true,
        }))
      );
    } else {
      setCheck(false);
      setItems((items) =>
        items.map((item) => ({
          label: item.label,
          checked: false,
        }))
      );
    }
  };

  const countChecked = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.checked ? 1 : 0), 0);
  }, [items]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      ind: number,
      setter: React.Dispatch<React.SetStateAction<ItemData[]>>
    ) => {
      const newItems = items.map((item, i) => {
        if (i === ind) {
          return { label: item.label, checked: e.target.checked };
        }
        return item;
      });
      const countChecked = newItems.reduce(
        (acc, item) => acc + (item.checked ? 1 : 0),
        0
      );
      countChecked === items.length ? setCheck(true) : setCheck(false);
      setter(newItems);
    },
    [items]
  );

  const id = Math.random().toString(36).slice(2);

  return (
    <div className="min-w-[200px] p-8 flex flex-col gap-2 flex-1">
      <input
        type="text"
        className="p-2 mb-2 outline-none border-none bg-gray-50 rounded-md border border-black"
        value={inputVal}
        onKeyUp={onKeyUp}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <div className="divider"></div>
      <div className="ml-4 flex gap-2">
        <input type="checkbox" id={id} checked={check} onChange={toggleAll} />
        <label htmlFor={id}>
          {`${countChecked} / ${items.length}`} Selected
        </label>
      </div>
      <div className="divider"></div>
      <div className="mt-2 flex flex-col gap-2 bg-neutral-300 p-4 rounded-xl shadow-2xl">
        {items.map((obj, ind) => (
          <div key={ind} className="bg-gray-400 p-4 rounded-md flex gap-2">
            <input
              type="checkbox"
              id={obj.label}
              checked={obj.checked}
              onChange={(e) => handleChange(e, ind, setItems)}
            />
            <label className="font-semibold cursor-pointer" htmlFor={obj.label}>
              {obj.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList2;
