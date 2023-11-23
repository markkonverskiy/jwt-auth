import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [activeAuth, setActiveAuth] = useState("login");

  const handleLoginClick = () => {
    setActiveAuth("login");
  };

  const handleRegisterClick = () => {
    setActiveAuth("register");
  };

  return (
    <div className="main">
      <div className="authBlock">
        <div className="changeContent">
          <button
            onClick={handleLoginClick}
            style={{
              width: "160px",
              height: "40px",
              background: activeAuth === "login" ? "none" : "transparent",
              outline: "none",
              border: "none",
              color: activeAuth === "login" ? "white" : "rgb(131, 131, 131)",
              fontWeight: "600",
              fontSize: "20px",
              cursor: "pointer",
              transition: "0.5s all ease-in-out",
              borderBottom:
                activeAuth === "login"
                  ? "2px solid white"
                  : "2px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            Sign In
          </button>

          <button
            onClick={handleRegisterClick}
            style={{
              width: "160px",
              height: "40px",
              background: activeAuth === "register" ? "none" : "transparent",
              outline: "none",
              border: "none",
              color: activeAuth === "register" ? "white" : "rgb(131, 131, 131)",
              fontWeight: "600",
              fontSize: "20px",
              cursor: "pointer",
              transition: "0.5s all ease-in-out",
              borderBottom:
                activeAuth === "register"
                  ? "2px solid white"
                  : "2px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            Sign Up
          </button>
        </div>
        <div className="content">
          {activeAuth === "login" ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}

export default App;
