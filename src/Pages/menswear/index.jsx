import axios from "axios";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import CardProducts from "../../components/CardProducts";
import { Link } from "react-router-dom";

export default function Products() {
  const [getDataProducts, setGetDataProducts] = useState(null);

  const onFetchProducts = async () => {
    try {
      const findProduct = await axios.get(`http://localhost:5000/products`);
      console.log(findProduct);
      setGetDataProducts(findProduct.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onFetchProducts();
  }, []);

  if (getDataProducts === null) return <h1>Loading...</h1>;

  return (
    <div className="px-32">
      {/* Section: Headers */}
      <div>
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn rounded-sm border border-black m-1"
          >
            Category
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-sm w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn rounded-sm border border-black m-1"
          >
            Price
          </div>
          <div
            tabIndex={0}
            className="flex flex-col gap-3 dropdown-content z-[1] p-2 shadow bg-base-100 rounded-sm"
          >
            <div className="flex items-center gap-10 ">
              <input
                type="text"
                placeholder="Minimum"
                className="input rounded-none border border-black"
              />
              -
              <input
                type="text"
                placeholder="Maximum"
                className="input rounded-none border border-black"
              />
            </div>
            <button className="btn bg-black text-white w-full rounded-none">
              Search
            </button>
          </div>
        </div>
      </div>
      {/* Section: Product List */}
      <div className="grid grid-cols-12 gap-10 py-10 px-1">
        {getDataProducts.map((products, index) => {
          return (
            <div key={index} className="col-span-3">
              <Link to={`/detailproduct/${products.id}`}>
                <CardProducts
                  key={index}
                  image={products.image}
                  price={'Rp.' + ' ' + products.price.toLocaleString('id-ID')}
                  size={products.sizes}
                  name={products.nameProduct}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
