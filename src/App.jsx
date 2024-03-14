// import './App.css'
import { Outlet } from "react-router-dom";
import Navbar from "./components/cores/Navbar/navbar";
import Footer from "./components/cores/Footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { userContext } from "./supports/context/useUserContext";
import ProtectedRoute from "./components/cores/ProtectedRoute";
import { cartContext } from "./supports/context/useCartContext";

function App() {
  const [useData, setUserData] = useState(null);
  const [cartData, setCartData] = useState(null);

  return (
    <>
      <userContext.Provider value={{ useData, setUserData }}>
        <cartContext.Provider value={{ cartData, setCartData }}>
          <Navbar />

          <div className="py-32">
            <ProtectedRoute />
            <ToastContainer />
            <Outlet />
            <ProtectedRoute />
          </div>

          <Footer />
        </cartContext.Provider>
      </userContext.Provider>
    </>
  );
}

export default App;
