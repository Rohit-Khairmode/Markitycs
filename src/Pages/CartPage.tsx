import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../contexts/CartContext";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/16/solid";
import { formatCurrency } from "../utils/helpers";
import Navigation from "../components/Navigation";

function CartPage() {
  const { products, setProducts } = useCart();
  const navigate = useNavigate();
  const set = new Set([...products]);
  const displayProducts = [...set];
  let price = products.reduce((acc: number, product: any) => {
    acc += Number(product.price);
    return acc;
  }, 0.0);
  price = Number(price.toFixed(2));
  function handleGobackBtn() {
    navigate(-1);
  }

  return (
    <>
      {/* <Navigation /> */}
      <div></div>
      <div className="xl:max-w-7xl mx-auto my-5 justify-center px-4 grid  gap-4">
        <ArrowLeftCircleIcon
          className="h-8 w-8 hover:cursor-pointer"
          onClick={handleGobackBtn}
        />
        {/* <h3>Go Back</h3> */}
        <main className="grid gap-5 border-2 p-4 bg-accent-20">
          {products.length > 0 ? (
            <>
              <div className="grid">
                {displayProducts?.map((cartItem: any) => (
                  <CartItem key={cartItem.id + Math.random()} item={cartItem} />
                ))}
              </div>
              <div className="flex justify-between border-b-2">
                <strong>Total Amount</strong>
                <strong>{formatCurrency(price)}</strong>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 justify-center items-center">
              <h3 className="font-bold text-primary-500">Your cart is empty</h3>
              <Link
                to="/"
                className="p-3 bg-accent-300 hover:bg-accent-600 ease-in duration-400 transition-all text-white font-bold"
              >
                Explore various Products
                <ArrowRightCircleIcon className="size-6 inline-block" />
              </Link>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default CartPage;
