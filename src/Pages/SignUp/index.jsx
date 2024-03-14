import { FaGoogle, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import { registerSchema } from "../../supports/schema/authentication";

export default function SignUp() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <img
          src="https://assets.depop.com/web/assets/sellerOnboarding/sticker-smile.png"
          alt="logo"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className=" font-bold text-xl">Sign Up</div>
        <div>
          Already got an accout? <span className="text-blue-400">Log in</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-6">
        <button className="btn rounded-none w-[400px] h-[10px] bg-white text-base input input-bordered">
          <FaGoogle size={15} />
          Continue with Google
        </button>
      </div>
      <div className="flex flex-col justify-center items-center pt-2">
        <button className="btn rounded-none w-[400px] h-[10px] bg-black text-white text-base">
          <FaApple size={15} />
          Continue with Apple
        </button>
        <div className="flex flex-col justify-center items-center pt-2">
          <Link to="/register">
            <button className="btn rounded-none w-[400px] h-[10px] bg-white text-base font-bold border-2 border-black">
              Continue with Email
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
