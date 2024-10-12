import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types";
const ProductsContext = createContext<Product[]>([]);
function ProductsProvider({ children }: any) {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(function () {
    fetch("http://localhost:9000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("product form context", data);
        setProducts(data || []);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}
function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined)
    throw new Error("ProductContext was used outside of the QuizProvider");
  return context;
}
export { ProductsProvider, useProducts };
