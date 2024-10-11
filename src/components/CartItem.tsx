import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { formatCurrency } from "../utils/helpers";
import { useCart } from "../contexts/CartContext";
import { Product } from "../types";

function CartItem({ item }: any) {
  const { products, setProducts } = useCart();
  const [isPending, setIsPending] = useState(false);

  function handleCartItemUpdate(increment: boolean) {
    setIsPending(true);
    try {
      if (increment) {
        setProducts((products) => [...products, item]);
      } else {
        let isFirstFound = false;
        setProducts((products) => {
          return products.filter((product) => {
            if (!isFirstFound && product.id === item.id) {
              isFirstFound = true;
              return false;
            }
            return true;
          });
        });
      }
      toast.success(
        `${item.name} product quantity ${
          increment ? "increased" : "decreased"
        }`,
        {
          style: {
            backgroundColor: "#333",
            color: "#fff",
          },
        }
      );
    } catch (err) {
      toast.error("There is some error while updating cart");
    } finally {
      setIsPending(false);
    }
  }
  function deleteCartItem() {
    setIsPending(true);
    try {
      setProducts((products: Product[]) => {
        return products.filter((product) => product.id !== item.id);
      });
      toast.success("Item Deleted Successfully", {
        style: {
          backgroundColor: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      toast.error("There is some error while deleting item");
    } finally {
      setIsPending(false);
    }
  }
  return (
    <div className="flex border-3 hover:drop-shadow-lg hover:bg-slate-100 p-2 ease-in duration-100 ">
      <div>
        <img
          src={item.image}
          alt={`${item.name} image`}
          className="w-full h-48 xl:h-72 object-cover mb-4"
        />
      </div>
      <div className="flex flex-col gap-1 justify-evenly px-3">
        <h3 className="text-primary-600 font-bold">{`${item.name}`}</h3>
        <strong>{`${formatCurrency(item.price)}`}</strong>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex items-center">
              <button
                disabled={isPending || item.quantity <= 1}
                className={`${
                  isPending || item.quantity <= 1
                    ? "hover:cursor-not-allowed opacity-50"
                    : "hover:cursor-pointer"
                }`}
                onClick={() => handleCartItemUpdate(false)}
              >
                <MinusCircleIcon className="size-5 hover:text-accent-400" />
              </button>
              <strong className="border-2 p-1">{`${products.reduce(
                (acc, product) => (product.id === item.id ? acc + 1 : acc),
                0
              )}`}</strong>
              <button
                disabled={isPending}
                className={`${
                  isPending
                    ? "hover:cursor-not-allowed opacity-50"
                    : "hover:cursor-pointer"
                }`}
              >
                <PlusCircleIcon
                  className="size-5 hover:text-accent-400"
                  onClick={() => handleCartItemUpdate(true)}
                />
              </button>
            </div>
          </div>
          <button
            disabled={isPending}
            className={`bg-primary-900 text-amber-50  p-1 text-sm hover:bg-accent-400 ${
              isPending
                ? "hover:cursor-not-allowed opacity-50"
                : "hover:cursor-pointer"
            } `}
            onClick={() => {
              deleteCartItem();
            }}
          >
            {!isPending ? (
              <TrashIcon className="size-5" />
            ) : (
              <div className="spinner-mini"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
