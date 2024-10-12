import { createContext, useContext, useState } from "react";
import { Product } from "../types";
const CartContext = createContext<{
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}>({
  products: [],
  setProducts: (products) => {
    return products;
  },
});
function CartProvider({ children }: any) {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <CartContext.Provider value={{ products, setProducts }}>
      {children}
    </CartContext.Provider>
  );
}
function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("ProductContext was used outside of the QuizProvider");
  return context;
}
export { CartProvider, useCart };
