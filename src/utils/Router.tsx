import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Login from '../page/Login';
import Timer from "../page/Timer";
import WorKLog from "../page/WorkLog";
import Setting from "../page/Setting";
import ChangeEmail from "../page/ChangeEmail";
import ChangePassword from "../page/ChangePassword";
import Cancel from "../page/Cancel";
import Page404 from "../page/Page404";
import ResetPassword from "../page/ResetPassword";
import SignUp from "../page/SignUp";
import PreRegistrationComplete from "../page/PreRegistrationComplete";

const Router = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="resetpassword" element={<ResetPassword />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="preregistrationcomplete" element={<PreRegistrationComplete />} />
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
