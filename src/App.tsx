import { Routes, Route, Link } from "react-router-dom";
import Blog from "./components/Blog";
import MyDialog from "./components/Demo";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog-details">Blog Details</Link>
      </nav>

      <MyDialog />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/blog-details/:id" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
