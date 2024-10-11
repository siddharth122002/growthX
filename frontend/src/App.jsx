import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Assignments from "./components/Assignments";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </Router>
  );
}

export default App;
