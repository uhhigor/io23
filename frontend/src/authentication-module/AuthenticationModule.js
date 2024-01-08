import "./style.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ForgottenPasswordPage from "./Pages/ForgottenPasswordPage";
import MainPage from "./Pages/mainPage";

function AuthenticationModule() {
  return (
      <Routes>
          <Route path="/" element={<HomePage/>} exact />
          <Route path="/home" element={<MainPage/>}/>
          <Route path="/forgottenPassword" element={<ForgottenPasswordPage/>} />
      </Routes>
  );
}

export default AuthenticationModule;
