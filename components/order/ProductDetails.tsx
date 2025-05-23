import { useStore } from "@/src/store";
import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import {XCircleIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";


type ProductDetailsProps = {
  item: OrderItem;
};

export default function ProductDetails({ item }: ProductDetailsProps) {
 
  const incrementQuantity = useStore((state) => state.incrementQuantity)
  const decrementQuantity = useStore((state) => state.decrementQuanty)
  const disableDecreaseButton = useMemo(() => item.quantity === 1, [item.quantity]);
  const disableIncreaseButton = useMemo(() => item.quantity === 5, [item.quantity]);
  const removeItem = useStore((state) => state.removeItem)


  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" 
          onClick={() => removeItem(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">{formatCurrency(item.price)}</p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button type="button" 
          onClick={() => decrementQuantity(item.id) }
          disabled={disableDecreaseButton}
          className="disabled:opacity-20"
          >
            <MinusIcon className="h-6 w-6" 
             
            />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button type="button" 
            onClick={() => incrementQuantity(item.id)}
            disabled={disableIncreaseButton}
            className="disabled:opacity-20"
            
            >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""} {formatCurrency(item.subtotal)}
          <span className="font-normal"></span>
        </p>
      </div>
    </div>
  );
}
