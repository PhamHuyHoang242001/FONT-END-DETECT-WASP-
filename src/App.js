import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  const key = localStorage.getItem("userRole");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          {key === "1" ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<SignIn />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
