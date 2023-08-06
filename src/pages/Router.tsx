import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import Login from '../features/Login/pages/Login';
import Timer from "../features/Timer/pages/Timer";
import WorkLog from "../features/WorkLog/pages/WorkLog";
import Setting from "../features/Setting/pages/Setting";
import ChangeEmail from "../features/ChangeEmail/pages/ChangeEmail";
import ChangePassword from "../features/ChangePassword/pages/ChangePassword";
import Cancel from "../features/Cancel/pages/Cancel";
import Page404 from "../features/NotPage/pages/Page404";
import ResetPassword from "../features/ResetPassword/pages/ResetPassword";
import SignUp from "../features/SignUp/pages/SignUp";
import PreRegistrationComplete from "../features/SignUp/pages/PreRegistrationComplete";
import ResetPasswordSubmitted from "../features/ResetPassword/pages/ResetPasswordSubmitted";
import AuthProvider from "../features/Auth/components/AuthProvider"
import ProtectedRoute from "../features/Auth/components/ProtectedRoute";
import LoginProtectedRoute from "../features/Auth/components/LoginProtectedRoute";

// Timerページで時間を計測中にページ遷移を防ぐために使用している
// ReactRouterPromptを動かすために下記のようなルーディングの書き方をしている。
export const routesConfig = [
  { path: "login",
    element:
      <AuthProvider>
        <LoginProtectedRoute>
          <Login />
        </LoginProtectedRoute>
      </AuthProvider>
  },
  { path: "resetpassword", element: <ResetPassword /> },
  { path: "signup", element: <SignUp /> },
  { path: "preregistrationcomplete", element: <PreRegistrationComplete /> },
  { path: "resetpasswordsubmitted", element: <ResetPasswordSubmitted /> },
  {
    path: "/",
    element:
      <AuthProvider>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </AuthProvider>,
    children: [
      { index: true, element: <Timer /> },
      { path: "worklog", element: <WorkLog /> },
      {
        path: "setting",
        element: <Setting />,
        children: [
          { path: "changeemail", element: <ChangeEmail /> },
          { path: "changepassword", element: <ChangePassword /> },
          { path: "cancel", element: <Cancel /> },
        ],
      },
    ],
  },
  { path: "*", element: <Page404 /> },
];

const router = createBrowserRouter(routesConfig);

const Router = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;
