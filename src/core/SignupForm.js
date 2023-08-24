import React from "react";
import { useState } from "react";
import Background from "../images/Background.png";
import Logo from "../images/Logo1.png";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [securityquestion, setSecurityquestion] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation for Full Name
    if (!fullname) {
      setErrorMessage("Full Name is required");
      return;
    }
    if (!/^[a-zA-Z ]+$/.test(fullname)) {
      setErrorMessage("Full Name should contain alphabetic characters only");
      return;
    }
    if (fullname.length > 50) {
      setErrorMessage("Full Name should be maximum 50 characters long");
      return;
    }

    // Validation for Email Address
    if (!email) {
      setErrorMessage("Email Address is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Email Address is not in a valid format");
      return;
    }

    // Validation for Password
    if (!password) {
      setErrorMessage("Password is required");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password should be at least 8 characters long");
      return;
    }
    if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
      setErrorMessage(
        "Password should contain both letters and digits and have at least one uppercase letter"
      );
      return;
    }

    // Validation for Confirm Password
    if (!confirmPassword) {
      setErrorMessage("Confirm Password is required");
      return;
    }
    if (confirmPassword !== password) {
      setErrorMessage("Confirm Password should match the entered password");
      return;
    }

    // Validation for Date of Birth
    if (!dateofbirth) {
      setErrorMessage("Date of Birth is required");
      return;
    }
    const isValidDate = (dateString) => {
      const date = new Date(dateString);
      return date instanceof Date && !isNaN(date);
    };

    if (!isValidDate(dateofbirth)) {
      setErrorMessage("Invalid Date of Birth format");
      return;
    }

    // Validation for Phone Number
    if (!phonenumber) {
      setErrorMessage("Phone Number is required");
      return;
    }
    if (!/^\d{10}$/.test(phonenumber)) {
      setErrorMessage("Phone Number should be a valid 10-digit number");
      return;
    }

    // Validation for Address
    if (!address) {
      setErrorMessage("Address is required");
      return;
    }
    if (address.length > 100) {
      setErrorMessage("Address should be maximum 100 characters long");
      return;
    }

    // Validation for City
    if (!city) {
      setErrorMessage("City is required");
      return;
    }
    if (!/^[a-zA-Z ]+$/.test(city)) {
      setErrorMessage("City should contain alphabetic characters only");
      return;
    }
    if (city.length > 50) {
      setErrorMessage("City should be maximum 50 characters long");
      return;
    }

    // Validation for State
    if (!state) {
      setErrorMessage("State is required");
      return;
    }

    // Validation for Zip Code
    if (!zipcode) {
      setErrorMessage("Zip Code is required");
      return;
    }
    if (!/^\d{6}$/.test(zipcode)) {
      setErrorMessage("Zip Code should be a valid 6-digit number");
      return;
    }

    // Validation for Country
    if (!country) {
      setErrorMessage("Country is required");
      return;
    }

    // Validation for Security Question
    if (!securityquestion) {
      setErrorMessage("Security Question is required");
      return;
    }

    // Validation for Security Answer
    if (!securityquestion) {
      setErrorMessage("Security Answer is required");
      return;
    }
    if (securityquestion.length > 100) {
      setErrorMessage("Security Answer should be maximum 100 characters long");
      return;
    }

    if (!errorMessage) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/auth/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullname,
              email,
              dateofbirth,
              password,
              confirmPassword,
              phonenumber,
              address,
              securityquestion,
              city,
              state,
              country,
              zipcode,
            }),
          }
        );
        // console.log(response.body);
        console.log(response);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          toast.success("Signup successfull");
          navigate("/");
        } else {
          console.error("Signup failed");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex">
        <div className="p-6 pb-2 w-2/3 h-screen hidden lg:flex relative object-cover rounded-xl">
          <img src={Background} width={740} height={1016} alt="" />
          <div className="absolute top-12 left-12">
            <img src={Logo} alt="" />
          </div>
        </div>

        <div className="w-full h-screen">
          <div className="w-11/12 h-fit p-4 flex flex-col mx-auto items-center lg:items-start justify-center">
            <p className="text-[#7181A1] text-xl justify-start">Welcome</p>
            <p className="text-4xl">Signup</p>

            <form onSubmit={handleOnSubmit}>
              {errorMessage && (
                <p className="error-message border p-2 mt-2 rounded-lg bg-red-500 text-slate-200 text-center">
                  {errorMessage}
                </p>
              )}
              <div className="flex flex-grow gap-12">
                <div className="w-full flex flex-col flex-grow items-start py-6">
                  <label
                    htmlFor="fullname"
                    className="text-base font-light text-gray-900 text-start w-full"
                  >
                    Fullname
                    <span className="text-pink-700 pl-2 text-base"> *</span>
                    <input
                      required
                      type="text"
                      id="fullname"
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="John Doe"
                      className="border text-base font-light items-start w-full p-2 rounded-md mt-2 flex-grow"
                    />
                  </label>
                </div>
                <div className="w-full flex flex-col items-start justify-center">
                  <label
                    htmlFor="email"
                    className="text-base font-light text-gray-900 text-start w-full"
                  >
                    Email
                    <span className="text-pink-700 pl-2 text-base"> *</span>
                    <input
                      required
                      type="text"
                      id="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="allthebest@Neokred.com"
                      className="border text-base font-light items-start w-full p-2 rounded-md  mt-2"
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-12">
                <div className="w-full flex flex-col items-start">
                  <label
                    htmlFor="dateofbirth"
                    className="text-base font-light text-gray-900 text-start w-full"
                  >
                    Date Of Birth
                    <span className="text-pink-700 pl-2 text-base"> *</span>
                    <input
                      required
                      type="text"
                      id="dateofbirth"
                      onChange={(e) => setDateofbirth(e.target.value)}
                      placeholder="12/12/12"
                      className="border text-base font-light items-start p-2 rounded-md w-full  mt-2"
                    />
                  </label>
                </div>
                <div className="w-full flex flex-col items-start justify-center">
                  <label
                    htmlFor="password"
                    className="text-base font-light text-gray-900 text-start relative w-full"
                  >
                    Password
                    <span className="text-pink-700 pl-2 text-base pr-4">
                      {" "}
                      *{" "}
                    </span>
                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="**************"
                      className="border text-base font-light items-start p-2 rounded-md w-full mt-2"
                    />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-[34px] z-[10] cursor-pointer mt-2"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                      )}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-12">
                <div className="w-full flex flex-col items-start py-4">
                  <label
                    htmlFor="phonenumber"
                    className="text-base font-light text-gray-900 text-start w-full"
                  >
                    Phone Number
                    <span className="text-pink-700 pl-2 text-base"> *</span>
                    <input
                      required
                      type="text"
                      id="phonenumber"
                      onChange={(e) => setPhonenumber(e.target.value)}
                      placeholder="+91-9876543210"
                      className="border text-base font-light items-start rounded-md w-full p-2 mt-2"
                    />
                  </label>
                </div>
                <div className="w-full flex flex-col items-start justify-center">
                  <label
                    htmlFor="confirmPassword"
                    className="text-base font-light text-gray-900 relative text-start"
                  >
                    Confirm Password
                    <span className="text-pink-700 pl-2 text-base"> *</span>
                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="************"
                      className="border text-base font-light items-start p-2 rounded-md w-full  mt-2"
                    />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-[34px] z-[10] cursor-pointer mt-2"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                      )}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-12">
                <div className="w-full flex flex-col items-start justify-items-stretch">
                  <label
                    htmlFor="securityquestion"
                    className="text-base font-light text-gray-900 text-start w-full"
                  >
                    Security Question
                    <span className="text-pink-700 pl-2 text-base"> *</span>
                    <p className="text-xs gap-3 text-slate-400">
                      What is your School Name?
                    </p>
                    <input
                      required
                      type="text"
                      id="securityquestion"
                      onChange={(e) => setSecurityquestion(e.target.value)}
                      className="border text-base font-light items-start p-2 rounded-md w-full mt-2"
                    />
                  </label>
                </div>
                <div className="w-full flex flex-col items-start justify-center"></div>
              </div>

              <div className="items-start text-start flex flex-col gap-2 md:mt-4">
                <label
                  htmlFor="fullname"
                  className="text-base font-light text-gray-900 text-start p-[-80]"
                >
                  Address
                  <span className="text-pink-700 pl-2 text-base"> *</span>
                </label>
                <input
                  required
                  type="text"
                  id="address"
                  autoComplete="address"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="*********"
                  className="border text-base font-light items-start w-full p-2 rounded-md"
                />
              </div>
              <div className="flex gap-12">
                <div className="w-full flex flex-col items-start py-6">
                  <label
                    htmlFor="city"
                    className="text-base font-light text-gray-900 text-start"
                  >
                    City
                    <span className="text-pink-700 pl-2 text-base"> *</span>
                    <input
                      required
                      type="text"
                      id="city"
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="******"
                      className="border text-base font-light items-start w-full p-2 rounded-md  mt-2"
                    />
                  </label>
                </div>
                <div className="w-full flex flex-col items-start justify-center">
                  <label
                    htmlFor="state"
                    className="text-base font-light text-gray-900 text-start"
                  >
                    State
                    <span className="text-pink-700 pl-2 text-base"> *</span>
                    <input
                      required
                      type="text"
                      id="state"
                      onChange={(e) => setState(e.target.value)}
                      placeholder="******"
                      className="border text-base font-light items-start w-full p-2 rounded-md  mt-2"
                    />
                  </label>
                </div>
                <div className="w-full flex flex-col items-start py-6">
                  <label
                    htmlFor="zipcode"
                    className="text-base font-light text-gray-900 text-start overflow-auto"
                  >
                    ZIP Code
                    <span className="text-pink-700 pl-2 text-base"> *</span>
                    <input
                      required
                      type="text"
                      id="zipcode"
                      onChange={(e) => setZipcode(e.target.value)}
                      placeholder="******"
                      className="border text-base font-light items-start w-full p-2 rounded-md mt-2 "
                    />
                  </label>
                </div>
                <div className="w-full flex flex-col items-start justify-center">
                  <label
                    htmlFor="country"
                    className="text-base font-light text-gray-900 text-start"
                  >
                    Country
                    <span className="text-pink-700 pl-2 text-base"> *</span>
                    <input
                      required
                      type="text"
                      id="country"
                      autoComplete="country"
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="******"
                      className="border text-base font-light items-start w-full p-2 rounded-md mt-2"
                    />
                  </label>
                </div>
              </div>

              <button className="border p-2 bg-[#194DFF] text-slate-100 text-lg rounded-lg w-[35%] flex flex-col items-center mt-4">
                Signup
              </button>
              <p className="text-sm pt-4 text-[#7181A1] text-start gap-2">
                Already have an account?
                <Link to={"/"} className="text-blue-600">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
