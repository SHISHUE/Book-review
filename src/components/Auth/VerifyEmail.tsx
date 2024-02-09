import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {signUp} from '../../services/operations/authAPI'
function VerifyEmail() {
    const { signupData } = useSelector((state) => state.auth);

    const [otp, setOtp] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!signupData) {
          navigate("/signup");
        }
      }, [navigate, signupData]);

      const submitHandler = (e) => {
        e.preventDefault();
    
        const {
    
          firstName,
          lastName,
          email,
          password,
        
        
        } = signupData;
    
        dispatch(
          signUp(
            firstName,
            lastName,
            email,
            password,
            otp,
            navigate
          )
        );
      };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="rounded-xl border-[1px] border-zinc-900 px-4 py-3">
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="otp" className="text-[1.5vw] font-semibold">
              Enter your otp <sup className="text-red-500">*</sup>
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="OTP..."
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border-[1px] rounded-md border-zinc-900 w-[22vw] mb-3 pl-2 flex items-center"
            />

            <button
              type="submit"
              className="mt-[2vw] px-[3vw] rounded-xl py-2 w-full border-[1px] border-zinc-900 text-[1.4vw] font-semibold hover:bg-zinc-900 hover:text-zinc-100 transition-all duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
