import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState("");
  const [admin, setAdmin] = useState("");
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAdmins = async () => {
      const res = await axios.get("https://growth-x-one.vercel.app/admins");
      // console.log(res.data);
      setAdmins(res.data);
      setLoading(false);
    };
    getAdmins();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // console.log(token);
    setLoading(true);
    const res = await axios.post(
      "https://growth-x-one.vercel.app/upload",
      {
        assignment,
        admin,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    setLoading(false);
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div
            onClick={logout}
            className="absolute top-0 right-0 p-8 text-red-500 font-semibold text-xl cursor-pointer hover:text-red-700"
          >
            Logout
          </div>
          <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">
              <p className="text-4xl">Upload Assignment</p>
            </h2>

            <form onSubmit={handleUpload}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="assignment"
                >
                  Assignment
                </label>
                <textarea
                  type="text"
                  rows={8}
                  id="assignment"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={assignment}
                  onChange={(e) => setAssignment(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="admin">
                  Select Admin
                </label>
                <select
                  id="admin"
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select Admin</option>
                  {admins.map((admin, i) => (
                    <option key={i} value={admin.username}>
                      {admin.username}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Upload;
