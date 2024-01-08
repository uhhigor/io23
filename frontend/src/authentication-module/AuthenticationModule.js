import "./style.css";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ForgottenPasswordPage from "./Pages/ForgottenPasswordPage";
import MainPage from "./Pages/mainPage";

function AuthenticationModule() {
  return (
    <div className="AuthenticationModule">
      <Route path="/" component={HomePage} exact />
      <Route path="/home" component={MainPage} />
      <Route path="/forgottenPassword" component={ForgottenPasswordPage} />
    </div>
  );
}

export default AuthenticationModule;
