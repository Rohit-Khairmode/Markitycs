import { useState } from "react";
import { formatCurrency } from "../utils/helpers";
import { Product } from "../types";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";
function ProductCard({ product }: { product: Product }) {
  const [isPending, setIsPending] = useState(false);
  const cart = useCart();
  function AddToCartHandler() {
    setIsPending(true);
    try {
      cart.setProducts((products: Product[]) => {
        return [...products, product];
      });
      toast.success(`${product.name} successfully added into the cart`);
    } catch (err: any) {
      toast.error("There is some error" + err);
    } finally {
      setIsPending(false);
    }
  }
  return (
    <div
      key={product.id}
      className="border rounded-lg  bg-accent-20 ease-in duration-300 p-2 hover:bg-slate-100 hover:drop-shadow-lg transition-all"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 xl:h-72 object-cover mb-4"
      />
      <div className=" flex flex-col  p-2 gap-3">
        <h3 className="text-primary-600 font-bold">{product.name}</h3>
        <div className="flex justify-between  items-center mt-auto ">
          <strong className="">{formatCurrency(product.price)}</strong>
          <button
            className="bg-primary-900 text-amber-50 uppercase px-3 py-3 hover:bg-accent-400 "
            onClick={AddToCartHandler}
          >
            {!isPending ? "add to cart" : <div className="spinner-mini"></div>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
