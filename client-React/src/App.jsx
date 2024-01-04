import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./clientViews/Home/home";
import Shops from "./clientViews/Shops/shops.jsx";
import Navbar from "./clientcomponents/Navbar/navbar.jsx";
import Users from "./clientViews/Users/users.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/amba" element={<Shops />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
