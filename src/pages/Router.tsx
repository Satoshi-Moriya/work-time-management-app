import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Login from '../features/Login/pages/Login';
import Timer from "../features/Timer/pages/Timer";
import WorKLog from "../features/WorkLog/pages/WorkLog";
import Setting from "../features/Setting/pages/Setting";
import ChangeEmail from "../features/ChangeEmail/pages/ChangeEmail";
import ChangePassword from "../features/ChangePassword/pages/ChangePassword";
import Cancel from "../features/Cancel/pages/Cancel";
import Page404 from "../features/NotPage/pages/Page404";
import ResetPassword from "../features/ResetPassword/pages/ResetPassword";
import SignUp from "../features/SignUp/pages/SignUp";
import PreRegistrationComplete from "../features/SignUp/pages/PreRegistrationComplete";
import ResetPasswordSubmitted from "../features/ResetPassword/pages/ResetPasswordSubmitted";

const Router = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="resetpassword" element={<ResetPassword />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="preregistrationcomplete" element={<PreRegistrationComplete />} />
      <Route path="resetpasswordsubmitted" element={<ResetPasswordSubmitted />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Timer />}/>
        <Route path="worklog" element={<WorKLog />}/>
        <Route path="setting" element={<Setting />}>
          <Route path="changeemail" element={<ChangeEmail />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="cancel" element={<Cancel />} />
        </Route>
      </Route>
      <Route path="/*" element={<Page404 />}/>
    </Routes>
  );
}

export default Router;
