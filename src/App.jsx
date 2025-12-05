import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Landingpage from "./pages/landingpage";
import EcoMap from "./pages/ecoMap";
 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landingpage" />} />
        <Route path="/landingpage" element={<Landingpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ecoMap" element={<EcoMap />} />
          <Route path="/nearbyBusiness" element={<EcoMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;