import { Toaster } from "react-hot-toast";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <HomePage />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 2000,
          },
          error: {
            duration: 3000,
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
