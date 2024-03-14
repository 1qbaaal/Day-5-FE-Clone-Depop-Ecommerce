import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { registerSchema } from "../../supports/schema/authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onHandleRegister = async (values, resetForm) => {
    try {
      setIsLoading(true);

      // Step-01: cek email ssudah terdaftar atau belum?

      const findEmail = await axios.get(
        `http://localhost:5000/users?email=${values.email}`
      );

      // findEmail.data berisikan array data apabila emailnya sudah terdaftar
      // dan akan berisikan array kosong apabila emailnya belum terdaftar

      if (findEmail.data.length > 0) throw new Error("Email Already Register!");

      const res = await axios.post("http://localhost:5000/users", values);
      navigate("/login");
      toast.success("Register Success");
      resetForm();
    } catch (error) {
      toast.error(
        error.message ? error.message : "Register Failed! Please Try Again!"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2">
        <div>
          <img
            className=""
            src="https://i.pinimg.com/564x/31/5a/6d/315a6d29158977920f6eb3781645dd1e.jpg"
            alt="gambar"
          />
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
          }}
          validationSchema={registerSchema}
          onSubmit={async (values, { resetForm }) => {
            await onHandleRegister(values, resetForm);
          }}
        >
          {({ dirty, isValid }) => {
            return (
              <Form>
                <div className="flex flex-col items-center py-[30px]">
                  <h1 className="font-bold text-2xl flex justify-center">
                    {" "}
                    Sign Up
                  </h1>

                  <div className="flex flex-row">
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Firstname</span>
                      </div>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs rounded-none"
                      />
                      <ErrorMessage
                        name="firstName"
                        component={"div"}
                        className="text-red-500"
                      />
                    </label>
                    <label className="form-control w-full max-w-xs ml-2">
                      <div className="label">
                        <span className="label-text">Lastname</span>
                      </div>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs rounded-none"
                      />
                      <ErrorMessage
                        name="lastName"
                        component={"div"}
                        className="text-red-500"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col items-center w-[600px]">
                    <label className="form-control w-auto">
                      <div className="label w-[438px]">
                        <span className="label-text">Email</span>
                      </div>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Type here"
                        className="input input-bordered rounded-none"
                      />
                      <ErrorMessage
                        name="email"
                        component={"div"}
                        className="text-red-500"
                      />
                    </label>
                    <label className="form-control">
                      <div className="label w-[438px]">
                        <span className="label-text">Username</span>
                      </div>
                      <Field
                        type="text"
                        name="username"
                        placeholder="Type here"
                        className="input input-bordered rounded-none"
                      />
                      <ErrorMessage
                        name="username"
                        component={"div"}
                        className="text-red-500"
                      />
                    </label>
                    <label className="form-control">
                      <div className="label w-[438px]">
                        <span className="label-text">Password</span>
                      </div>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Type here"
                        className="input input-bordered rounded-none"
                      />
                      <ErrorMessage
                        name="password"
                        component={"div"}
                        className="text-red-500"
                      />
                    </label>
                    <button
                      type="submit"
                      className="btn bg-black text-white w-[438px] rounded-none my-3"
                      disabled={!((dirty && isValid) || isLoading)}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
