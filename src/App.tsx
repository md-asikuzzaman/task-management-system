import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
