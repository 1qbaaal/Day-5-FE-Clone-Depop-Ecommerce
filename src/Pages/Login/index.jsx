import { useContext, useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { userContext } from "../../supports/context/useUserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { schemaValidated } from "../../supports/schema/authentication";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData } = useContext(userContext);
  const  navigate  = useNavigate();

  const onHandleLogin = async (values, resetForm) => {
    try {
      setIsLoading(true);
      let findEmail;
      if (values.emailOrUsername.includes("@")) {
        findEmail = await axios.get(
          `http://localhost:5000/users?email=${values.emailOrUsername}&password=${values.password}`
        );
      } else {
        findEmail = await axios.get(
          `http://localhost:5000/users?username=${values.emailOrUsername}&password=${values.password}`
        );
      }

      if (findEmail.data.length === 0) throw new Error("Wrong Email,Username or Password!");
      console.log(findEmail.data[0].username);
      navigate('/')
      toast.success("Login Success");
      setUserData({
        id: findEmail.data[0].id, 
        username: findEmail.data[0].username
    });
      localStorage.setItem('dataUser', JSON.stringify({
        id: findEmail.data[0].id,
        username: findEmail.data[0].username
      }))
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <Formik
      initialValues={{
        emailOrUsername: "",
        password: "",
      }}
      validationSchema={schemaValidated}
      onSubmit={(values, { resetForm }) => {
        onHandleLogin(values, resetForm);
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <Form>
            <div className="felx-1">
              <div className="flex justify-center items-center">
                <img
                  src="https://assets.depop.com/web/assets/sellerOnboarding/sticker-smile.png"
                  alt="logo"
                />
              </div>
              <div>
                <div className="flex flex-col justify-center items-center">
                  <div className=" font-bold text-xl">Log in</div>
                  <div>
                    Don't have an account?{" "}
                    <span className="text-blue-400">Sign Up</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center pt-6">
                  <button className="btn rounded-none w-[400px] h-[10px] bg-white text-base hover:bg-blue-50 input input-bordered">
                    <FcGoogle size={15} />
                    Continue with Google
                  </button>
                  <div className="flex flex-col justify-center items-center pt-2">
                    <button className="btn rounded-none w-[400px] h-[10px] bg-black text-white text-base">
                      <FaApple size={15} />
                      Continue with Apple
                    </button>
                    <div className="divider">or</div>

                    <div>
                      <label className="text-sm flex justify-start items-start w-[400px] text-gray-500 pt-2 pb-2">  
                        Email or Username 
                      </label>
                      <Field
                        type="text"
                        className="focus:outline-none border border-black w-[400px] h-[40px] pl-3"
                        placeholder="Typehere"
                        name="emailOrUsername"
                      />
                      <ErrorMessage
                        name="emailOrUsername"
                        component={"div"}
                        style={{ color: "red" }}
                      />
                    </div>
                    <div>
                      <label className="text-sm flex justify-start items-start w-[400px] text-gray-500 pt-2 pb-2 ">  
                        Password
                      </label>
                      <Field
                        type="password"
                        className="focus:outline-none border border-black w-[400px] h-[40px] pl-3"
                        placeholder="Typehere"
                        name="password"
                      />
                      <ErrorMessage
                        name="password"
                        component={"div"}
                        style={{ color: "red" }}
                      />
                    </div>

                    <div className="flex justify-end w-[400px] pt-2 text-blue-500">
                      Forgot Password?
                    </div>
                    <div className="flex justify-center items-center pt-2">
                      <button
                      type="submit"
                      className="btn rounded-none w-[400px] h-[10px] bg-black text-white text-base"
                      disabled={!(dirty && isValid) || isLoading}
                      >
                        Log in
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
