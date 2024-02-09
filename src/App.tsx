import { Route, Routes } from "react-router-dom";

import Error from "./components/Error";
import Home from "./components/Home";
import Navbar from "./components/common/Navbar";
import BookDetails from "./components/BookDetails";
import Login from "./components/Auth/Login";
import VerifyEmail from "./components/Auth/VerifyEmail";
import Signup from "./components/Auth/Signup";


function App() {

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
