import { useState } from "react";
import Navigation from "../components/Navigation";
import { useProducts } from "../contexts/ProductsContext";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import Modal from "../components/Modal";

function HomePage() {
  const [filter, setFilter] = useState<string>("");
  const products = useProducts();
  const [isModalOpen, setIsModal] = useState(false);
  const displayProducts =
    filter === "" || filter === "All"
      ? products
      : products.filter((product: Product) => product.category === filter);
  return (
    <>
      <div className={`${isModalOpen && "overscroll-none"}  `}>
        <Navigation setFilter={setFilter} setIsModal={setIsModal} />
        <main
          className={`grid gap-4 px-4 lp:gap-8 md:gap-6 my-5 auto-rows-max grid-cols-1 sm:grid-cols-2 lp:grid-cols-3 xl:grid-cols-4 justify-between items-center max-w-8xl mx-auto transition-all  lp:px-10 md:px-8  ${
            isModalOpen && "overflow-y-hidden h-[80vh]"
          } `}
        >
          {displayProducts?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>
        {isModalOpen && (
          <Modal isModalOpen={isModalOpen} setIsModal={setIsModal} />
        )}
      </div>
    </>
  );
}

export default HomePage;
