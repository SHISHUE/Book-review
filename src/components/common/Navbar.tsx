import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/_234f906a-b997-4ae2-ac5c-8682c5d468d1-fotor-bg-remover-20240207122312.png";
import { FaRegUser } from "react-icons/fa";
import { setInputValue } from "../../slices/inputSlice"; // Import setInputValue action
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";
import { IoExit } from "react-icons/io5";
import { RootState } from "../../app/store"; // Import RootState type

function Navbar() {
  const { user } = useSelector((state: RootState) => state.profile); // Specify RootState type
  const inputValue = useSelector((state: RootState) => state.input.inputValue); // Specify RootState type
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Specify event type
    dispatch(setInputValue(e.target.value)); // Dispatch the setInputValue action
  };

  return (
    <div className="w-full h-[6vw] flex justify-between items-center px-[4vw] border-b-[1px] py-4 border-zinc-200">
      <div>
        <img src={logo} alt="logo" className="w-[6vw] " onClick={() => navigate("/")} />
      </div>

      <div className="search">
        <input placeholder="Search..." type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Go</button>
      </div>

      <div>
        {user ? (
          <div className=" flex items-center gap-3 px-4 py-2 rounded-md border-[1px] border-zinc-900">
            <img src={user.image} alt="user" className="w-[3vw] rounded-full" />
            <div className="flex gap-x-2">
              <h3 className="text-[1.4vw] font-semibold text-zinc-900">{user.firstName}</h3>
              <h3 className="text-[1.4vw] font-semibold text-zinc-900">{user.lastName}</h3>
            </div>
            <div onClick={() => { dispatch(logout(navigate)); }} className="text-[1.4vw]">
              <IoExit />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <button onClick={() => navigate("/login")} className="px-4 py-2 rounded-xl bg-[#f1eeff] text-[#9185df] shadow-sm shadow-[#9185df] font-semibold transition-all duration-200 hover:bg-[#9185df] hover:text-[#f1eeff] hover:scale-[0.9]">
              Log in
            </button>
            <button onClick={() => navigate("/signup")} className="px-4 py-2 rounded-xl bg-[#6c5dd4] text-[#d6d3f2] shadow-md  font-semibold transition-all duration-200 hover:bg-[#d6d3f2] hover:text-[#6c5dd4] hover:scale-[0.9] flex items-center gap-3"><FaRegUser /> Register</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
