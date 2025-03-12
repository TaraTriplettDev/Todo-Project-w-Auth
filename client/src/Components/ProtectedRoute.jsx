import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import ToDo from "../ToDo.jsx";

const ProtectedRoute = () => {
  // assigns the use of the useNavigate function to a var called "nav"

  let nav = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/authCheck",
    })
      .then((res) => {
        console.warn("Protected Route auth res", res);

        if (res.data.msg !== "Valid Token") {
          nav("/");
        }
      })
      .catch((err) => {
        console.log("useAuth err", err);
      });
  }, []);

  return (
    <>
      {console.log("Protected Route HIT!")}
      <ToDo />
    </>
  );
};
export default ProtectedRoute;
