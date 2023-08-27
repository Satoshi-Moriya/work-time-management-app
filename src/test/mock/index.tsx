import Layout from "../../components/Layout";
import Login from "../../features/Login/pages/Login";
import RecordItem from "../../features/RecordItem/pages/RecordItem";
import RecordItemLog from "../../features/RecordItemLog/pages/RecordItemLog";
import Setting from "../../features/Setting/pages/Setting";
import ChangeEmail from "../../features/ChangeEmail/pages/ChangeEmail";
import ChangePassword from "../../features/ChangePassword/pages/ChangePassword";
import Cancel from "../../features/Cancel/pages/Cancel";
import Page404 from "../../features/NotPage/pages/Page404";
import SignUp from "../../features/SignUp/pages/SignUp";
import PreRegistrationComplete from "../../features/SignUp/pages/PreRegistrationComplete";


export const routesConfig = [
  { path: "login", element: <Login />},
  { path: "signup", element: <SignUp /> },
  { path: "preregistrationcomplete", element: <PreRegistrationComplete /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <RecordItem /> },
      { path: "recorditemlog", element: <RecordItemLog /> },
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