import { useContext, useEffect } from "react";
import { CiSearch, CiHeart, CiMenuBurger } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { userContext } from "../../../supports/context/useUserContext";
import axios from "axios";
import { cartContext } from "../../../supports/context/useCartContext";

export default function Navbar() {
  const router = useLocation();
  const { useData, setUserData } = useContext(userContext);
  const { cartData, setCartData } = useContext(cartContext);

  const handleKeepNotifCart = async () => {
    try {
      let usersData = localStorage.getItem("dataUser");
      usersData = JSON.parse(usersData);
      
      const findCartUser = await axios.get(
        `http://localhost:5000/carts?userId=${usersData.id}`
      );
      setCartData(findCartUser.data.length);
      console.log(findCartUser.data.length)
    } catch (error) {
      console.log(error);
    }
  };

  const hadleKeepLogin = async () => {
    try {
      let usersData = localStorage.getItem("dataUser");
      usersData = JSON.parse(usersData);

      const res = await axios.get(
        `http://localhost:5000/users/${usersData.id}`
      );
      setUserData({
        id: res.data.id,
        username: res.data.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hadleKeepLogin();
    handleKeepNotifCart();
  }, []);

  return (
    <>
      <div className="fixed w-full bg-white z-10">
        <div className="flex items-center bg-base-100 px-10 py-2">
          {/* Div Left */}
          <div className="flex-1 flex items-center gap-3">
            <CiMenuBurger className="block lg:hidden" size={30} />
            <Link to="/">
              <img
                className="h-[25px] pl-10"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Depop_logo.svg/1295px-Depop_logo.svg.png"
              />
            </Link>
          </div>

          {/* Div Center */}
          <div className="flex-1 hidden lg:block">
            <div className="flex items-center gap-2 border px-3 py-3 rounded-full">
              <CiSearch />
              <input
                type="text"
                placeholder="Search"
                className="focus:outline-none lg:w-auto max-w-fit"
              />
            </div>
          </div>

          {/* Div Right */}

          <div className="flex-1 gap-4 flex justify-end items-center">
            <div className="hover:cursor-pointer">
              <CiHeart size={30} className="hover:text-pink-500 relative" />
            </div>

            <div className="hover:text-violet-400 relative">
              <div className="absolute top-0 right-0 mr-[-10px] bg-red-500 text-white text-xs rounded-full px-2">
                {cartData}
              </div>
              <IoBagOutline size={30} className="hover:cursor-pointer"/>
            </div>

            <div className="flex gap-4 pr-10 justify-end items-center">
              <Link to="SellNow">
                <button className="btn font-bold rounded-none bg-black text-white hover:bg-red-500 lg:block hidden lg:block">
                  Sell now
                </button>
              </Link>

              {useData !== null ? (
                <p className="font-bold">Hello, {useData.username} </p>
              ) : (
                <>
                  <Link to="/SignUp">
                    <button className="btn rounded-none bg-black text-white hover:bg-gray-500 lg:bg-white border border-black lg:text-black hover:border-black">
                      Sign up
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="rounded-none bg-white text-black text-lg font-bold hover:text-gray-500 hidden lg:block">
                      Log In
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <hr />
        <div
          className={`flex gap-4 px-20 py-2 ${
            router.pathname === "/login" ||
            router.pathname === "/SignUp" ||
            router.pathname === "/register"
              ? "hidden"
              : "block"
          }`}
        >
          <Link to="/product">
            <button className="font-bold text-black ">Menswear</button>
          </Link>
          <button className="font-bold text-black ">Womenswear</button>
          <button className="font-bold text-black ">Brands</button>
          <button className="font-bold text-red-500 ">Sale</button>
          <marquee className="font-bold text-xl text-lime-400">
            {" "}
            SALE UP TO 100%{" "}
          </marquee>
        </div>
        <hr />
      </div>
    </>
  );
}
