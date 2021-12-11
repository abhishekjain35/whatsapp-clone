import "./App.css";
import Login from "./pages/login";
import { Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import Home from "./pages/home";
import Signup from "./pages/signup";
import "./firebase";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
