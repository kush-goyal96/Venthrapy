import Home from "./pages/Home.jsx";
import Team from "./pages/Team.jsx";
import Blogs from "./pages/Blogs.jsx";
import FAQ from "./pages/FAQ.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/team" element={<Team/>} />
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/faq" element={<FAQ/>} />
    </Routes>
  );
}

export default App;
