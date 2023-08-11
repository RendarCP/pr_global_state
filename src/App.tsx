import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import RecoilPage from './pages/Recoil.page';



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/recoil" element={<RecoilPage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App
