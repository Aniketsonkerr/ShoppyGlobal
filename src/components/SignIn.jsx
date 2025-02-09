import { useState } from "react";

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  function handleLogin(e) {
    e.preventDefault();
    const response = fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Email,
        password: Password,
      }),
    });
    const result = response.then((data) => data.json());
    result.then((data) => {
      localStorage.setItem("accessToken", data.accessToken);
      alert("logged in successfully");
    });
  }
  function handleRegister(e) {
    e.preventDefault();
    const response = fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: Email,
        password: Password,
      }),
    });

    const result = response.then((data) => data.json());
    result.then((data) => {
      setIsSignUp(true);
      setEmail("");
      setPassword("");
      setUsername("");
    });
  }
  return (
    <>
      <form>
        {!isSignUp && (
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              placeholder="enter FullName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
        )}
        <div>
          <label>Email:</label>
          <input
            type="text"
            placeholder="enter Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Set Password:</label>
          <input
            type="text"
            placeholder="enter Password "
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button onClick={!isSignUp ? handleRegister : handleLogin}>
          {!isSignUp ? "register" : "login"}
        </button>
        <div>
          Not registered?
          <a onClick={() => setIsSignUp(false)}>create account</a>
        </div>
      </form>
    </>
  );
}

export default SignIn;
