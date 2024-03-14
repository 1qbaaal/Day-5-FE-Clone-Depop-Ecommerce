import axios from "axios";
import { useContext, useDeferredValue, useEffect, useState } from "react";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../../components/cores/Loading";
import { toast } from "react-toastify";
import { userContext } from "../../supports/context/useUserContext";
import { cartContext } from "../../supports/context/useCartContext";
export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { useData } = useContext(userContext);
  const { setCartData } = useContext(cartContext);

  const onFetchProduct = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/products/${params.productsId}`
      );
      console.log(result);
      setProduct(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleAddToCart = async () => {
    try {
      if (selectedSize === null) throw new Error("Select Size First!");

      const checkProductExist = await axios.get(`http://localhost:5000/carts?productId=${product.id}&userId=${useData.id}`)
      if(checkProductExist.data.length === 0){
        console.log('???')
        await axios.post("http://localhost:5000/carts", {
        userId: useData.id,
        productId: product.id,
        quantity,
      });
      }else{
        const currentQuantity = checkProductExist.data[0].quantity
        const newQuantity = currentQuantity + quantity

        if(newQuantity > selectedSize.stock) return toast.error('Stock Not Enough!')
        await axios.patch(`http://localhost:5000/carts/${checkProductExist.data[0].id}`, {
        quantity: newQuantity
      })
      }

      const findCartUser = await axios.get(`http://localhost:5000/carts?userId=${useData.id}`)
      setCartData(findCartUser.data.length)

      toast.success("Add to Cart Success!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    onFetchProduct();
  }, []);

  if (product === null) return <Loading />;

  return (
    <div className="pt-[20px] px-[150px]">
      <div className="grid grid-cols-2 ">
        <div className="w-full h-[500px]">
          <img
            src={product.image}
            className="border border-black w-full h-full max-w-full min-h-full object-cover"
          />
        </div>
        <div className="px-[30px] font-sans tracking-wide w-[400px]">
          <h1 className="text-black font-bold text-2xl">
            {product?.nameProduct}
          </h1>
          <h1 className="text-black font-bold text-2xl">Rp. {product.price.toLocaleString('id-ID')}</h1>

          <p className="py-4">
            {product.stock}
            {selectedSize === null ? null : (
              <>
                Size {selectedSize.size}: Stock {selectedSize.stock} -
              </>
            )}{" "}
            Used - Excellent -{" "}
            <span>
              <u>Compass!</u>
            </span>
          </p>
          <div className="flex items-center gap-2">
            {product?.sizes?.length ? (
              <div className="dropdown w-full">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn w-full rounded-none bg-white text-black border-2 border-black hover:bg-gray-500 text-[15px] tracking-wide"
                >
                  {selectedSize?.size ? selectedSize?.size : "Sizes"}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] p-2 w-full shadow bg-base-100 rounded-sm w-52"
                >
                  {product?.sizes?.map((size, index) => {
                    return (
                      <li
                        onClick={() => setSelectedSize(size)}
                        className="hover: bg-gray-100 hover:rounded-sm px-2 py-2 hover:cursor-pointer text-center border border-black"
                      >
                        {size.size}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            <p className="pb-2 font-bold">Quantity</p>
            <button
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity === 1 ? true : false}
              className="bg-black text-white border border-black w-[35px] h-[35px] rounded-none font-bold flex items-center justify-center px-2"
            >
              -
            </button>
            <p className="font-bold text-xl">{quantity}</p>
            <button
              onClick={() => setQuantity(quantity + 1)}
              disabled={selectedSize?.stock === quantity ? true : false}
              className="bg-black text-white border border-black w-[35px] h-[35px] rounded-none font-bold flex items-center justify-center px-2"
            >
              +
            </button>
          </div>

          <div className="pt-2">
            <button className="btn w-full rounded-none bg-black text-white border-2 border-black hover:bg-gray-500 text-[15px] tracking-wide">
              Buy Now!
            </button>
          </div>
          <div className="pt-2">
            <button
              onClick={onHandleAddToCart}
              className="btn w-full bg-white rounded-none border-2 border-black ext-[15px] tracking-wide hover:border-black "
            >
              Add to Bag!
            </button>
          </div>
          <div className="pt-8 gap-4 flex justify-center item center">
            <MdOutlineVerifiedUser
              size={30}
              className="flex justify-center items-center"
            />
            <span className="text-xs">
              All purchases through Depop are covered by Buyer Protection.{" "}
              <span>
                <u>Learn more</u>
              </span>
            </span>
          </div>
          <div className="divider" />
          <h1> a Collaboration Compass with Neighborhood - Black Shoes </h1>
        </div>
      </div>
    </div>
  );
}
