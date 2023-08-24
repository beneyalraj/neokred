import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../images/Logo1.png";
import Background from "../images/Background.png";

const LoginForm = () => {
  const { token, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (token !== null) {
      navigate("/profile");
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Email Address is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Email Address is not in a valid format");
      return;
    }

    if (!password) {
      setErrorMessage("Password is required");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password should be at least 8 characters long");
      return;
    }
    if (!errorMessage) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          login(data.token);

          navigate("/profile");
        } else {
          console.error("Login failed");
          alert("You are not a registered user, please Signup");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="md:w-full h-screen lg:flex ">
        <div className="p-6 pb-2 w-full h-screen hidden lg:flex relative lg:object-cover rounded-xl">
          <img src={Background} width={916} height={1016} alt=""></img>
          <div className="absolute top-12 left-12">
            <img src={Logo} alt=""></img>
          </div>
        </div>
        <div className="w-full h-screen">
          <div className="w-[480px] h-full flex flex-col mx-auto  items-center lg:items-start justify-center ">
          <div className="block lg:hidden pb-20 mt-[-10%]">
            <img src={Logo} alt=""></img>
          </div>
            <p className="text-[#7181A1] text-xl justify-start">Welcome</p>
            <p className="text-4xl">Login</p>
            <form onSubmit={handleOnSubmit}>
              {errorMessage && (
                <p className="error-message border p-2 mt-2 rounded-lg bg-red-500 text-slate-200">
                  {errorMessage}
                </p>
              )}
              <div className=" w-full flex flex-col items-start py-6 ">
                <label className="mb-2 text-lg font-medium text-gray-900 ">
                  Email<span className="text-pink-700 pl-2 text-lg"> *</span>
                </label>
                <input
                  required
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johnsnow@gmail.com"
                  className="border text-lg items-start w-full p-2 rounded-md pr-36"
                />
                  
              </div>
              <div className=" w-full flex flex-col items-start ">
                <label className="mb-2 text-lg font-medium text-gray-900 ">
                  Password<span className="text-pink-700 pl-2 text-lg"> *</span>
                </label>
                <input
                  required
                  type="text"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="**********"
                  className="border text-lg items-start w-full p-2 rounded-md pr-36"
                />
              </div>
              <p className="text-sm text-blue-600 text-end pt-2">
                Forgot password?
              </p>
              <button className="border p-2 bg-[#194DFF] text-slate-100 text-lg  rounded-lg w-[80%] flex flex-col items-center mt-4">
                Login
              </button>
              <p className="text-sm pt-4 text-[#7181A1] text-start">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600">
                  signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
