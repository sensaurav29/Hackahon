
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProductContext from "./components/Wrapper/Wrapper";

createRoot(document.getElementById("root")).render(
  <ProductContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductContext>
);
