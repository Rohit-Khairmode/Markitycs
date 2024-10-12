// import { useCart } from "../contexts/CartContext";

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/16/solid";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utils/helpers";
import CartItem from "./CartItem";

function Modal({ isModalOpen, setIsModal }: any) {
  const { products } = useCart();
  const set = new Set([...products]);
  const displayProducts = [...set];
  let price = products.reduce((acc: number, product: any) => {
    acc += Number(product.price);
    return acc;
  }, 0.0);
  price = Number(price.toFixed(2));
  function handleGobackBtn() {
    setIsModal(false);
  }
  return (
    <>
      <div
        className={`h-full w-full absolute  ${
          isModalOpen
            ? "block pointer-events-auto visible top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-md overflow-hidden"
            : "hidden pointer-events-none z-[-1]"
        }`}
        onClick={() => setIsModal(false)}
      ></div>
      <main
        className={`grid gap-5 border-2 p-4 bg-slate-200 h-2/3 w-2/3 overflow-y-scroll ${
          isModalOpen
            ? "block pointer-events-auto visible absolute top-0 left-0 right-0 bottom-0 z-20 m-auto"
            : "hidden pointer-events-none z-[-2]"
        }`}
      >
        {products.length > 0 ? (
          <>
            <ArrowLeftCircleIcon
              className={`h-8 hover:cursor-pointer justify-start`}
              onClick={handleGobackBtn}
            />
            <div className="grid">
              {displayProducts?.map((cartItem: any) => (
                <CartItem key={cartItem.id + Math.random()} item={cartItem} />
              ))}
            </div>
            <div className="flex justify-between gap-2 border-b-2 sm:text-lg text-sm hover:bg-white py-4 px-2 text-center">
              <strong>Total Amount</strong>
              <strong>{formatCurrency(price)}</strong>
            </div>
          </>
        ) : (
          <div
            className={`flex flex-col gap-2 justify-center items-center ${
              isModalOpen
                ? "block pointer-events-auto visible absolute top-0 left-0 right-0 bottom-0 z-20 m-auto"
                : "hidden pointer-events-none z-[-2]"
            }`}
          >
            <h3 className="font-bold text-primary-500">Your cart is empty</h3>
            <button
              onClick={() => setIsModal(false)}
              className="p-3 bg-accent-300 hover:bg-accent-600 ease-in duration-400 transition-all text-white font-bold"
            >
              Explore various Products
              <ArrowRightCircleIcon className="size-6 inline-block" />
            </button>
          </div>
        )}
      </main>
      {/* <div
        className={`${
          isModalOpen
            ? "block pointer-events-auto visible absolute z-20 m-auto"
            : "hidden pointer-events-none z-[-2]"
        }`}
      >
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div className="flex justify-between border-b-2">
          <strong>Total Amount</strong>
          <strong>{formatCurrency(price)}</strong>
        </div>
      </div> */}
    </>
  );
}

export default Modal;
