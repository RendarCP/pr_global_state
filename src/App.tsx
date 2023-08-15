import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RecoilPage from "./pages/Recoil.page";
import JotailPage from "./pages/Jotail.page";
import ZustandPage from "./pages/Zustand.page";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/recoil" element={<RecoilPage />} />
          <Route path="/jotai" element={<JotailPage />} />
          <Route path="/zutand" element={<ZustandPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
