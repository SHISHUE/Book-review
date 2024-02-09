import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/operations/authAPI";
import { sendOtp } from "../../services/operations/authAPI";
import { setSignupData } from "../../slices/authSlice";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(setSignupData(userData))
    dispatch(sendOtp(email, navigate))
    navigate('/verify-email')
    
    // Clear input fields after submission
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-[30vw] h-[80vh] bg-white border-[1px] border-zinc-900 text-zinc-900 flex flex-col rounded-xl px-3 py-2 items-center">
        <h1 className="text-[2.5vw] font-semibold mb-2">Register</h1>

        <form onSubmit={submitHandler}>
          <div className="h-full flex flex-col justify-evenly">
            <label htmlFor="firstName" className="text-[1.5vw] font-semibold">
              First Name <sup className="text-red-500">*</sup>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="border-[1px] rounded-md border-zinc-900 w-[22vw] mb-3 pl-2 flex items-center"
            />

            <label htmlFor="lastName" className="text-[1.5vw] font-semibold">
              Last Name <sup className="text-red-500">*</sup>
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="border-[1px] rounded-md border-zinc-900 w-[22vw] mb-3 pl-2 flex items-center"
            />

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
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border-[1px] rounded-md border-zinc-900 w-[22vw] mb-3 pl-2 flex items-center"
            />

            <label htmlFor="confirmPassword" className="text-[1.5vw] font-semibold">
              Confirm Password <sup className="text-red-500">*</sup>
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="border-[1px] rounded-md border-zinc-900 w-[22vw] mb-3 pl-2 flex items-center"
            />
          <button type="submit" className=" px-[3vw] rounded-xl py-2 w-full border-[1px] border-zinc-900 text-[1.4vw] font-semibold hover:bg-zinc-900 hover:text-zinc-100 transition-all duration-200">Register</button>
          </div>
        </form>
        <p className="mt-1 font-semibold text-[1.3vw]">Are you have account ? <Link to='/login' className="text-blue-500 font-bold hover:underline transition-all duration-200 ">Register</Link></p>
      </div>
    </div>
  );
}

export default Signup;
