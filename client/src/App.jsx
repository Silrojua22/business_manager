import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./clientViews/Home/home";
import Navbar from "./clientcomponents/Navbar/navbar.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
