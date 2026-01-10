import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Packing from "./pages/Packing";
import ShopStock from "./pages/ShopStock";
import EmbroideryDetails from "./pages/EmbroideryDetails";
import Reports from "./pages/Reports";
import FabricDetails from "./pages/FabricDetail";
import ChangeSecurity from "./pages/ChangeSecurity";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    setIsAuth(loggedIn);
  }, []);

  // Called from Login.js after successful login
  const handleLogin = () => {
    localStorage.setItem("isAdminLoggedIn", "true");
    setIsAuth(true);
  };

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route
          path="/"
          element={isAuth ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />}
        />

        {/* Protected routes */}
        <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" replace />} />
        <Route path="/packing" element={isAuth ? <Packing /> : <Navigate to="/" replace />} />
        <Route path="/shop-stock" element={isAuth ? <ShopStock /> : <Navigate to="/" replace />} />
        <Route
          path="/embroidery-details"
          element={isAuth ? <EmbroideryDetails /> : <Navigate to="/" replace />}
        />
        <Route path="/reports" element={isAuth ? <Reports /> : <Navigate to="/" replace />} />
        <Route
          path="/fabric-details"
          element={isAuth ? <FabricDetails /> : <Navigate to="/" replace />}
        />
        <Route
          path="/change-security"
          element={isAuth ? <ChangeSecurity /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
