import { useCallback } from "react";
import { ItemData } from "./Q6";

type ItemProps = {
  items: ItemData[];
  setItems: React.Dispatch<React.SetStateAction<ItemData[]>>;
};

const ItemList: React.FC<ItemProps> = ({ items, setItems }) => {
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      ind: number,
      setter: React.Dispatch<React.SetStateAction<ItemData[]>>
    ) => {
      setter((prev) => {
        return prev.map((item, i) => {
          if (i === ind) {
            return { label: item.label, checked: e.target.checked };
          }
          return item;
        });
      });
    },
    []
  );

  return (
    <div className="min-w-[200px] border border-black p-4 flex flex-col justify-center gap-2">
      {items.map((obj, ind) => (
        <div key={ind} className="bg-gray-300 p-4 rounded-md flex gap-2">
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
  );
};

export default ItemList;
