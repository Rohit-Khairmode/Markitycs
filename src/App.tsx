import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import CartPage from "./Pages/CartPage";

function App() {
  return (
    <>
      {/* <div>Main Page</div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12} //gap between window and toaster
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000, //3sec
          },
          error: {
            duration: 5000, //5 sec
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "black",
            color: "white",
          },
        }}
      />
    </>
  );
}

export default App;
