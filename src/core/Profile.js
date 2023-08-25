import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Avatar from "../images/Avataravatar.png";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo1.png";

export const Profile = () => {
  const { isAuthenticated, logout } = useAuth();
  const Navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;

    return `${month}/${day}/${year}`;
  }

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      <Navigate to="/" />;
      return;
    }
  }, []);

  useEffect(() => {
    try {
      const id = jwtDecode(localStorage.getItem("token")).id;
      const getExpiryTime = () => {
        return jwtDecode(localStorage.getItem("token"))
          ? jwtDecode(localStorage.getItem("token")).exp
          : null;
      };
      const isTokenExpired = () => {
        const expiryTime = getExpiryTime();
        if (expiryTime) {
          return expiryTime * 1000 - new Date().getTime() < 5000;
        } else {
          return false;
        }
      };
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/v1/auth/profile/` + id
          );
          const data = await response.json();
          console.log(data.data);
          if (response !== null) {
            setUserDetails(data.data);
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError(error.message);
          <Navigate to="/" />;
        }
      };

      if (isTokenExpired()) {
        logout();
      }
      fetchUserProfile();
    } catch (error) {

    }
  }, [logout]);

  return (
    <div>
      {isAuthenticated ? (
        <div className="w-full h-screen flex gap-6 justify-center items-center relative">
          <div className="flex justify-between w-full h-10% absolute top-2 border-b ">
            <div className="pl-6">
              <img src={Logo} alt=""></img>
            </div>
            <div className="pr-6">
              <p className="text-[#7181A1]">{userDetails.fullname}</p>
              <p>NK Admin</p>
            </div>
          </div>
          <div className="hidden md:block h-screen pt-16 ">
            <img src={Avatar} alt=""></img>
          </div>
          <div className="md:w-[540px] md:h-[680px]  p-6 gap-6 border rounded-lg pt-6 bg-slate-100/95">
            <div className="grid grid-cols-2">
              <div className="pb-8 text-[#7181A1]">PROFILE</div>
              <div> </div>
              <div className="p-3 text-base text-[#7181A1]">Name</div>
              <div className="p-3 text-base text-[#7181A1] pr-4">
                {userDetails.fullname}
              </div>
              <div className="p-3 text-base text-[#7181A1]">Email</div>
              <div className="p-3 text-base text-[#7181A1] pr-4">
                {userDetails.email}
              </div>
              <div className="p-3 text-base text-[#7181A1]">DOB</div>
              <div className="p-3 text-base text-[#7181A1] pr-4">
                {formatDate(userDetails.dateofbirth)}
              </div>
              <div className="p-3 text-base text-[#7181A1]">Phone Number</div>
              <div className="p-3 text-base text-[#7181A1] pr-4">
                +91-{userDetails.phonenumber}
              </div>
              <div className="p-3 text-base text-[#7181A1]">Address</div>
              <div className="p-3 text-base text-[#7181A1] pr-4 overflow-x-auto">
                {userDetails.address}
              </div>
              <div className="p-3 text-base text-[#7181A1]">City</div>
              <div className="p-3 text-base text-[#7181A1] pr-4">
                {userDetails.city}
              </div>

              <div className="p-3 text-base text-[#7181A1]">State</div>
              <div className="p-3 text-base text-[#7181A1] pr-4">
                {userDetails.state}
              </div>
              <div className="p-3 text-base text-[#7181A1]">ZipCode</div>
              <div className="p-3 text-base text-[#7181A1] pr-4">
                {userDetails.zipcode}
              </div>
              <div className="p-3 text-base text-[#7181A1]">Country</div>
              <div className="p-3 text-base text-[#7181A1] pr-4">
                {userDetails.country}
              </div>

              <div className="p-3 text-base text-[#7181A1]">Security</div>
              <div className="p-3 text-base text-[#7181A1] pr-4">
                {userDetails.securityquestion}
              </div>
            </div>

            <Link
              to="/"
              className=" flex justify-center pt-6 "
              onClick={handleLogout}
            >
              <div className="border bg-blue-500 text-slate-100 px-4 py-2 rounded-lg ">
                Logout
              </div>
            </Link>
          </div>
        </div>
      ) : (
        
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <p className=" text-4xl text-blue-400">
            Please log in to access your profile.
          </p>
          <Link
            to="/"
            className="text-blue-600 text-3xl border rounded-lg border-blue-600 py-1 px-6 mt-4"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};
