import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const account = "user";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/user/signin" element={<SignIn />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
