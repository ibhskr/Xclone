import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Divider from "@mui/material/Divider";
import { useForm } from "react-hook-form";
import axios from "axios";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

//-- function register and login'
//--
function Register() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Separate form for Sign-Up
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors },
    reset,
  } = useForm();

  // Separate form for Login
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm();

  // -
  //--
  //--- create new account logic
  const onSubmitSignUp = async (e) => {
    try {
      setIsSubmitting(true);
      const res = await axios.post("/api/auth/register", e);

      toast.success(res.data.message);
      console.log(res);
      {
        res.data.success && reset();
      }

      setShowSignup(false);
      setShowLogin(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
      // console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --
  //-- login logic
  //
  const onSubmitLogin = async (data) => {
    // console.log(data);
    try {
      setIsSubmitting(true);
      const res = await axios.post("/api/auth/login", data);
      console.log(res.data.user);
      dispatch(setUser(res.data.user));
      toast.success(res.data.message || "login successful!");
      // console.log(res);
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className=" bg-black w-screen h-screen text-white flex-col sm:flex sm:flex-row  sm:items-center sm:justify-center ">
        <div className="sm:w-1/2 ">
          <div className="flex justify-center items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.png/900px-X_logo_2023_%28white%29.png"
              alt=""
              className=" h-[50px] sm:h-[100px] md:h-[200px]  "
            />
          </div>
        </div>
        <div className="sm:w-1/2">
          <div className="text-center sm:text-left">
            <h1 className=" font-bold text-2xl sm:text-6xl">Happening now</h1>
            <h1 className=" font-bold  sm:text-4xl sm:mt-16 sm:mb-8">
              Join today.
            </h1>
          </div>
          <div className=" font-sans">
            <div className=" w-4/5 m-auto sm:m-0 mt-10 sm:w-max ">
              <button className=" w-full bg-white text-black rounded-full p-2 my-2  flex items-center justify-center">
                <FcGoogle size="20px" className="mx-2" />
                Signup with Google
              </button>

              <button className=" w-full bg-white text-black rounded-full p-2 my-2 flex items-center justify-center">
                <FaApple size="20px" className="mx-2" />
                Singup with Apple
              </button>

              <button
                onClick={() => setShowSignup(true)}
                className="w-full  bg-blue-400 text-black rounded-full p-2 my-2 text-center"
              >
                Create account
              </button>

              <p className=" text-sm text-gray-600 m-2">
                By signing up, you agree to the Terms of
                <br /> Service and Privacy Policy, including Cookie Use.
              </p>
              <h3 className="mt-10 text-base m-2">Already have an account?</h3>
              <button
                onClick={() => setShowLogin(true)}
                className="w-full border border-blue-400  text-white rounded-full p-2 my-2 text-center"
              >
                SignIn
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={showLogin ? "visible absolute top-0" : "hidden"}>
        {/* ------
        --------- login flot window ------
        -------- */}
        <div className="w-screen h-screen flex justify-center items-center relative bg-opacity-50 bg-gray-600">
          <div className=" w-full sm:w-4/5 md:w-3/5 xl:w-2/5  bg-black text-white  rounded-lg z-10">
            <div
              onClick={() => setShowLogin(false)}
              className=" text-white hover:bg-slate-800 hover:cursor-pointer rounded-full mb-4 w-fit"
            >
              <IoMdClose size="24px" />
            </div>
            <div className="flex justify-center">
              <div className=" w-1/2  ">
                <h1 className=" font-bold text-lg py-4">Sing in to X</h1>
                <div>
                  <button className=" w-full bg-white text-black rounded-full p-2 my-4  flex items-center justify-center">
                    <FcGoogle size="20px" className="mx-2" />
                    Signup with Google
                  </button>

                  <button className=" w-full bg-white text-black rounded-full p-2 my-4 flex items-center justify-center">
                    <FaApple size="20px" className="mx-2" />
                    Singup with Apple
                  </button>
                </div>
                <Divider>or</Divider>
                {/*  
                ---------------                
                 ------------------login input field 
                --------------------
                  */}
                <form
                  className="flex flex-col mt-4"
                  onSubmit={handleSubmitLogin(onSubmitLogin)}
                >
                  {/* username input field */}
                  <input
                    className="bg-transparent text-white placeholder-white border-b-2 border-white mt-4 outline-none"
                    {...registerLogin("username", { required: true })}
                    placeholder="@username"
                  />
                  {loginErrors.username && (
                    <span className="text-xs text-gray-400">
                      *This field is required
                    </span>
                  )}

                  {/* password input field */}
                  <input
                    type="password"
                    className="bg-transparent text-white placeholder-white border-b-2 border-white mt-4 outline-none"
                    {...registerLogin("password", {
                      required: true,
                      minLength: {
                        value: 6,
                        message: "Password Length minimum 6",
                      },
                      maxLength: {
                        value: 30,
                        message: "Password Length maximum 30",
                      },
                    })}
                    placeholder="Password"
                  />
                  {loginErrors.password && (
                    <span className="text-xs text-gray-400">
                      *{" "}
                      {loginErrors.password.message || "This field is required"}
                    </span>
                  )}

                  <button
                    type="submit"
                    className="bg-white text-black py-2 rounded-lg mt-5 mb-20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={showSignup ? "visible absolute top-0" : "hidden"}>
        {/* ---
        ------ Create account flot window ----
        ---- */}

        <div className="w-screen h-screen flex justify-center items-center relative bg-opacity-50 bg-gray-600">
          <div className=" w-full sm:w-4/5 md:w-3/5 xl:w-2/5  bg-black text-white  rounded-lg z-10">
            <div
              onClick={() => setShowSignup(false)}
              className=" text-white hover:bg-slate-800 hover:cursor-pointer rounded-full mb-4 w-fit"
            >
              <IoMdClose size="24px" />
            </div>
            <div className="flex justify-center">
              <div className=" w-1/2  ">
                <h1 className=" font-bold text-lg py-4">SingUp to X</h1>
                {/* 
                ------
                ---------signup input field // new account register input field ----------
                ------------
                 */}
                <form
                  className="flex flex-col mt-4"
                  onSubmit={handleSubmitSignup(onSubmitSignUp)}
                >
                  {/* fullname input field */}
                  <input
                    className="bg-transparent text-white placeholder-white border-b-2 border-white mt-4 outline-none"
                    {...registerSignup("name", { required: true })}
                    placeholder="Full Name"
                  />
                  {signupErrors.name && (
                    <span className="text-xs text-gray-400">
                      *This field is required
                    </span>
                  )}
                  {/* username input field */}
                  <input
                    className="bg-transparent text-white placeholder-white border-b-2 border-white mt-4 outline-none"
                    {...registerSignup("username", { required: true })}
                    placeholder="@username"
                  />
                  {signupErrors.username && (
                    <span className="text-xs text-gray-400">
                      *This field is required
                    </span>
                  )}
                  {/* email id input field */}
                  <input
                    type="email"
                    className="bg-transparent text-white placeholder-white border-b-2 border-white mt-4 outline-none"
                    {...registerSignup("email", { required: true })}
                    placeholder="Email id"
                  />
                  {signupErrors.email && (
                    <span className="text-xs text-gray-400">
                      *This field is required
                    </span>
                  )}
                  {/* password input field */}
                  <input
                    type="password"
                    className="bg-transparent text-white placeholder-white border-b-2 border-white mt-4 outline-none"
                    {...registerSignup("password", {
                      required: true,
                      minLength: {
                        value: 8,
                        message: "Password Length minimum 8",
                      },
                      maxLength: {
                        value: 30,
                        message: "Password Length maximum 30",
                      },
                    })}
                    placeholder="Password"
                  />
                  {signupErrors.password && (
                    <span className="text-xs text-gray-400">
                      *{" "}
                      {signupErrors.password.message ||
                        "This field is required"}
                    </span>
                  )}

                  <button
                    type="submit"
                    className="bg-white text-black py-2 rounded-lg mt-5 mb-20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing Up..." : "SignUp"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
