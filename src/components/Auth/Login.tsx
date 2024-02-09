import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/operations/authAPI";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password, navigate));
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-[30vw] h-[60vh] bg-white  border-[1px] border-zinc-900 text-zinc-900 flex flex-col rounded-xl px-3 py-2 items-center">
        <h1 className="text-[2.5vw] font-semibold mb-2">Log In</h1>

        <form onSubmit={(e) => submitHandler(e)}>
          <div className="h-full flex flex-col  justify-evenly">
            <label htmlFor="email" className="text-[1.5vw] font-semibold">
              Email <sup className="text-red-500">*</sup>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-[1px] rounded-md border-zinc-900 w-[22vw] mb-3 pl-2 flex items-center"
            />

            <label htmlFor="password" className="text-[1.5vw] font-semibold">
              Password <sup className="text-red-500">*</sup>
            </label>
            <input
              type="password" // corrected typo from "passowrd" to "password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border-[1px] rounded-md border-zinc-900 w-[22vw] mb-3 pl-2 flex items-center"
            />
          <button type="submit" className="mt-[2vw] px-[3vw] rounded-xl py-2 w-full border-[1px] border-zinc-900 text-[1.4vw] font-semibold hover:bg-zinc-900 hover:text-zinc-100 transition-all duration-200">Log In</button>
          </div>

        </form>

        <p className="mt-3 font-semibold text-[1.3vw]">New User Sign Up here <Link to='/signup' className="text-blue-500 font-bold hover:underline transition-all duration-200 ">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
