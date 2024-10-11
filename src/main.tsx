import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ProductsProvider } from "./contexts/ProductsContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ProductsProvider>
    <CartProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CartProvider>
  </ProductsProvider>
);
