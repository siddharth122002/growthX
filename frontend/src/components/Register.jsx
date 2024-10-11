import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import classs from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("https://growth-x-one.vercel.app/register", {
        username,
        password,
        role,
      });
      // console.log(res.data);
      setLoading(false);
      if (res.status == 200 && role === "User") {
        localStorage.setItem("token", res.data.newUser._id);
        navigate("/upload");
      }
      if (res.status == 200 && role === "Admin") {
        localStorage.setItem("token", res.data.newUser._id);
        navigate("/assignments");
      }
      toast.error(res.data.msg);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <ToastContainer />
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <div className="h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
              <h2 className="text-2xl font-bold mb-6 text-center">
                <img src={classs} className="m-auto" />
                <p className="text-4xl">Register</p>
              </h2>

              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="username"
                  >
                    Role
                  </label>
                  <select
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="username"
                  >
                    username
                  </label>
                  <input
                    type="input"
                    id="username"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Link to={"/"}>
                  <p className="block text-blue-500 font-semibold mb-2">
                    Already have an account?
                  </p>
                </Link>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
