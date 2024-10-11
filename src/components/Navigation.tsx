import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import { useCart } from "../contexts/CartContext";

function Navigation({ setFilter }: any) {
  const products = useProducts();
  const set: Set<string> = new Set<string>();
  products.forEach((product) => set.add(product.category));
  const categories: string[] = ["All", ...set];
  const cart = useCart();
  return (
    <nav className="flex justify-between items-center max-w-7xl  mx-auto transition-all p-2 ">
      <Link to="/" aria-label="Home">
        <img
          src="https://i.postimg.cc/qqdv0sQv/image-marky.png"
          alt="Markytics logo"
          width={80}
          height={80}
        />
      </Link>
      <div className="flex gap-6">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2"
        >
          {categories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
        <ul className="flex gap-2 lg:gap-4 justify-center items-center">
          <li className="relative">
            <Link to="/cart">
              <ShoppingCartIcon className="size-6 lp:size-8 text-primary-500 hover:text-accent-400 active:text-accent-400" />
              {cart.products.length != 0 ? (
                <span className="bg-accent-500 text-slate-50 font-bold rounded-[50%]  absolute top-0 translate-y-[-30%] left-[60%] translate-x-[-50%] px-0.5 text-sm ">
                  {cart.products.length >= 10 ? "9+" : cart.products.length}
                </span>
              ) : null}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
