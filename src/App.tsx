import { Route, Routes } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import Error from "./components/Error";
import Home from "./components/Home";
import Navbar from "./components/common/Navbar";
import BookDetails from "./components/BookDetails";
import Login from "./components/Auth/Login";
import VerifyEmail from "./components/Auth/VerifyEmail";
import Signup from "./components/Auth/Signup";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book-details/:bookId" element={<BookDetails />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
