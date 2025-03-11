import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  // setting up the login and register variables and making them rely on the useState function for their values

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [register, setRegister] = useState({
    username: "",
    password: "",
  });

  // assigns the useNavigate function to a variable called "nav"

  const nav = useNavigate();

  // takes the values of the Login input events and assigns them to an object with items that use the input ids as keys and the user inputs as values

  const handleLogin = (e) => {
    console.log("login", e.target.value);
    setLogin((prev) => {
      console.log("prev", prev);
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  // creates a json file including the method, the route, the value of login assigned by handleLogin, and the state of its credentials,
  // then sends it to the server via axios

  // If the message "Good Login" is received from the server, the user is taken to the Protected Route

  const handleLoginSubmit = () => {
    console.log(login);
    axios({
      method: "post",
      url: "http://localhost:3000/api/login",
      data: login,
      withCredentials: true,
    })
      .then((res) => {
        console.log("res", res.data);

        if (res.data.msg === "Good Login") {
          nav("/admin/");
        } else {
          alert("Bad Login");
        }
      })
      .catch((error) => console.log(error));
  };

  // Takes the values from the Register input events and creates an object containing key/value pairs of the input ids and user inputs

  const handleRegister = (e) => {
    console.log("reg", register);
    setRegister((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Creates a json file containing the method, url and data from handleRegister then sends it to the server through axios

  const handleRegisterSubmit = () => {
    console.log("reg", register);
    axios({
      method: "post",
      url: "http://127.0.0.1:3000/api/register",
      data: register,
    })
      .then((res) => console.log("res", res.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {/* Setting up login inputs */}

      <div id="login">
        {console.log("login", login)}
        {console.log("reg", register)}

        <h1>Login</h1>

        {/* The onChange segment takes the e(vent) and passes it to handleLogin */}

        <input
          id="username"
          onChange={(e) => handleLogin(e)}
          type="text"
          placeholder="Username"
        />

        <br />
        <br />

        <input
          id="password"
          onChange={(e) => handleLogin(e)}
          type="text"
          placeholder="password"
        />

        <br />
        <br />

        {/* calling the handleLoginSubmit function to submit the data in login */}

        <button onClick={() => handleLoginSubmit()}>Login</button>
      </div>

      <br />
      <br />
      <hr />
      <br />
      <br />

      {/* Same as above, but for registration */}

      <div id="register">
        <h1>Register</h1>

        <input
          id="username"
          onChange={(e) => handleRegister(e)}
          type="text"
          placeholder="Username"
        />

        <br />
        <br />

        <input
          id="password"
          onChange={(e) => handleRegister(e)}
          type="text"
          placeholder="Password"
        />

        <br />
        <br />

        <button onClick={() => handleRegisterSubmit()}>Register</button>
      </div>
    </div>
  );
}

export default App;
