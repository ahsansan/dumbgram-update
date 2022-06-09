// useState
import { useState } from "react";
// Register
import Register from "./Register";
// Login
import Login from "./Login";

function Welcome() {
  // login
  const [isOpenLogin, setOpenLogin] = useState(false);
  const handleLogin = (datanya) => setOpenLogin(datanya);

  // register
  const [isOpenRegister, setOpenRegister] = useState(false);
  const handleRegister = (datanya) => setOpenRegister(datanya);

  return (
    <div>
      {/* <h1 className="lp-dumbgram">DumbGram</h1> */}
      <img
        src={process.env.PUBLIC_URL + "/images/DumbGram.png"}
        alt="DumbGram"
      />
      <h2>Share your best photos or videos</h2>
      <p>
        Join now, share your creations with another people and enjoy other
        creation.
      </p>
      <div className="lp-tombol">
        <div>
          <p>
            <button
              className="login-auth-button"
              onClick={() => handleLogin(true)}
            >
              Login
            </button>{" "}
            <button
              className="register-auth-button"
              onClick={() => handleRegister(true)}
            >
              Register
            </button>
          </p>
          {isOpenLogin && (
            <Login
              isOpen={isOpenLogin}
              isClose={() => handleLogin(false)}
              isOpenRegister={() => handleRegister(true)}
            />
          )}
          {isOpenRegister && (
            <Register
              isOpen={isOpenRegister}
              isClose={() => handleRegister(false)}
              isOpenLogin={() => handleLogin(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
