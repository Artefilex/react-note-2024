import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/products/ProductPage";
import ProductDetail from "./pages/products/ProductDetail";
function App() {
  const routesList = [
    { path: "/", element: <Home /> },
    { path: "/products", element: <ProductPage /> },
    { path: "/products/:productId", element: <ProductDetail /> },
  ];

  return (
    <Router>
    <Routes>
      {routesList.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  </Router>
  );
}

export default App;
