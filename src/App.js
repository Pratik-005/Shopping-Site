import Home from "./pages/Home";
import Cart from "./pages/Cart"
import ProuctInfo from "./pages/ProuctInfo";
import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";

function App() {

  useEffect(() => {
    localStorage.clear();
  }, []); 

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productinfo/:id" element={<ProuctInfo />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
