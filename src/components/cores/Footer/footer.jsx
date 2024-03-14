import { useLocation } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const router = useLocation();

  return (
    <div
      className={`grid grid-4 ${
        router.pathname === "/SignUp" || router.pathname === '/register' ? "hidden" : "block"
      }`}
    >
      <footer className="flex justify-between p-4 bg-gray-100 text-base-content bottom-0 w-full absolute">
        <nav className="flex flex-col">
          <h6 className="text-black font-bold">Depop</h6>
          <a href="" className="py-[16px] hover:underline">
            About us
          </a>
          <a href="" className="py-[16px] hover:underline">
            Careers
          </a>
          <a href="" className="py-[16px] hover:underline">
            Blog
          </a>
          <a href="" className="py-[16px] hover:underline">
            News
          </a>
          <a href="" className="py-[16px] hover:underline">
            Impact
          </a>
        </nav>
        <nav className="flex flex-col">
          <h6 className="text-black font-bold">Sell</h6>
          <a className="py-[16px] hover:underline">Sell on Depop</a>
          <a className="py-[16px] hover:underline">Depop Amplified</a>
        </nav>
        <nav className="flex flex-col">
          <h6 className="text-black font-bold">Help</h6>
          <a className="py-[16px] hover:underline">Help Centre</a>
          <a className="py-[16px] hover:underline">Safety Centre</a>
        </nav>
        <nav className="flex justify-end place-items-end gap-6">
          <a
            href="https://twitter.com/askdepop/"
            target="_blank"
            className="hover:opacity-50"
          >
            <FaXTwitter size={20} />
          </a>
          <a
            href="https://instagram.com/miq.bal"
            target="_blank"
            className="hover:opacity-50"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@depop"
            target="_blank"
            className="hover:opacity-50"
          >
            <FaTiktok size={20} />
          </a>
        </nav>
      </footer>

      <footer className="px-2 py-4 text-base-content bottom-0 w-full absolute items-center flex h-[80px] bg-zinc-300 gap-6">
        <select
          className="h-[53px] bg-transparent hover:cursor-pointer hover:bg-[#f3f3f3] outline-none"
          defaultValue="United States"
        >
          <option>United States</option>
          <option>Bitung</option>
          <option>Cibodas</option>
          <option>Cisauk</option>
          <option>Ciledug</option>
          <option>Bintaro</option>
          <option>Lengkong</option>
        </select>
        <select
          className="h-[53px] bg-transparent hover:cursor-pointer hover:bg-[#f3f3f3] gap-2 outline-none"
          defaultValue="English"
        >
          <option>Sunda</option>
          <option>Jawa</option>
          <option>Ngapak</option>
          <option>Betawi</option>
          <option>Bali</option>
          <option>Latin</option>
          <option>English</option>
        </select>
      </footer>
    </div>
  );
}
