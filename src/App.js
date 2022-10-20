import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Nairi from "./pages/Nairi/Nairi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nairi" element={<Nairi />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
