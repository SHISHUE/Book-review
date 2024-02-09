import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../../services/operations/authAPI";
import { setSignupData } from "../../slices/authSlice";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function Signup() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData: UserData = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(setSignupData(userData));
    await dispatch(signUp(firstName, lastName, email, password, "", navigate));

    // Clear input fields after submission
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[30vw] h-[80vh] bg-white border-[1px] border-zinc-900 text-zinc-900 flex flex-col rounded-xl px-3 py-2 items-center">
        <h1 className="text-[2.5vw] font-semibold mb-2">Register</h1>

        <form onSubmit={submitHandler}>
          <div className="h-full flex flex-col justify-evenly">
            {/* Your input fields */}
          </div>
          <button type="submit" className="px-[3vw] rounded-xl py-2 w-full border-[1px] border-zinc-900 text-[1.4vw] font-semibold hover:bg-zinc-900 hover:text-zinc-100 transition-all duration-200">Register</button>
        </form>
        <p className="mt-1 font-semibold text-[1.3vw]">Already have an account? <Link to='/login' className="text-blue-500 font-bold hover:underline transition-all duration-200">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
