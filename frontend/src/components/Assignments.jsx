import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:3000/assignments", {
          headers: {
            Authorization: token,
          },
        });
        setAssignments(res.data.taggedAssignments);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching assignments", error);
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const handleAccept = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      await axios.get(`http://localhost:3000/assignments/${id}/accept`, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
      // Update state to reflect the accepted assignment
      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment._id === id
            ? { ...assignment, status: "accept" }
            : assignment
        )
      );
    } catch (error) {
      console.log("Error accepting assignment", error);
    }
  };

  const handleReject = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      await axios.get(`http://localhost:3000/assignments/${id}/reject`, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
      // Update state to reflect the rejected assignment
      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment._id === id
            ? { ...assignment, status: "reject" }
            : assignment
        )
      );
    } catch (error) {
      console.log("Error rejecting assignment", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div
            onClick={logout}
            className="absolute top-0 right-0 p-8 text-red-500 font-semibold text-xl cursor-pointer hover:text-red-700"
          >
            Logout
          </div>
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              <p className="text-4xl">Assignments</p>
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {assignments.length === 0 ? (
                  <p>No assignments found</p>
                ) : (
                  assignments.map((assignment) => (
                    <div
                      key={assignment._id}
                      className="p-4 border border-gray-300 rounded"
                    >
                      <p>
                        <strong>Task:</strong> {assignment.content}
                      </p>
                      <p>
                        <strong>Status:</strong> {assignment.status}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(assignment.date).toLocaleString()}
                      </p>
                      <div className="mt-4 flex justify-between">
                        <button
                          onClick={() => handleAccept(assignment._id)}
                          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-700 transition duration-200"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(assignment._id)}
                          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700 transition duration-200"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Assignments;
