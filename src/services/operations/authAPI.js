import { apiConnector } from "../apiconnector";
import {endpoints} from '../apis'
import {setUser} from '../../slices/profileSlice'
import {setToken} from '../../slices/authSlice'


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    localStorage.clear();
    navigate("/");
    alert('Logged Out');
  };
}

export function login(email, password, navigate) {
    return async (dispatch) => {
      try {
        const response = await apiConnector("POST", endpoints.LOGIN_API, {
          email,
          password,
        });
  
        // console.log("LOGIN API RESPONSE........", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        const userImage = response.data?.user?.image
        ? response.data?.user?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}${response.data.lastName}`;
        
        dispatch(setUser({ ...response.data.user, image: userImage }));
        // console.log("After SetUser: ", response.data.user)
        localStorage.setItem("token", JSON.stringify(response.data.data));
        // console.log("Token jo store ho raha hai woh...",response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
        dispatch(setToken(response.data.token));
      } catch (error) {
        console.log("LOGIN API ERROR...............", error);
      }
    };
  }


  export function sendOtp(email, navigate) {
    return async () => {
      try {
        const response = await apiConnector("POST", endpoints.SENDOTP_API, {
          email,
          checkUserPresent: true,
        });
        // console.log("SENDOTP API RESPONSE........", response);
        // console.log(response.data.success);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        navigate("/verify-email");
      } catch (error) {
        // console.log("SENDOTP API ERROR...........", error);
      }
    };
  }
  
  export function signUp(
    firstName,
    lastName,
    email,
    password,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      try {
        const response = await apiConnector("POST", endpoints.SIGNUP_API, {
          firstName,
          lastName,
          email,
          password,
          otp,
        });
  
        // console.log("SIGNUP API RESOPONSE..............", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        navigate("/login");
        alert("Account Created")
      } catch (error) {
        // console.log("SINGUP API ERROR.......", error);
        navigate("/");
        alert(error.message)
      } //finally{
      //     const response = {
      //         firstName,
      //         lastName,
      //         email,
      //         password,
      //         confirmPassword,
      //         accountType,
      //         contactNumber,
      //         otp,
      //         navigate
      //     }
      //     console.log("FINALLY ME HAI YEH........", response);
      // }
    };
  }