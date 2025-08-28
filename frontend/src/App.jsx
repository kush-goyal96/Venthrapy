import Home from "./pages/Home.jsx";
import Team from "./pages/Team.jsx";
import Blogs from "./pages/Blogs.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/team" element={<Team/>} />
      <Route path="/blogs" element={<Blogs/>} />
    </Routes>
  );
}

export default App;
