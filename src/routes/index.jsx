import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home/Home";

// import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";

import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";

// import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition/TermsAndCondition";
// import ServiceProvidersList from "../Pages/Dashboard/ServiceProvider/ServiceProvidersList.jsx";
// import Transaction from "../Pages/Dashboard/Transaction/Transaction.jsx";
import Setting from "../Pages/Dashboard/Setting/Setting.jsx";

import Products from "../Pages/Dashboard/Products/Products.jsx";
import OrderDetails from "../Pages/Dashboard/OrderDetails/OrderDetails.jsx";
import Earnings from "../Pages/Dashboard/Earnings/Earnings.jsx";
import ReturnPolicy from "../Pages/Dashboard/Policy/ReturnPolicy.jsx";
import PrivacyPolicy from "../Pages/Dashboard/Policy/PrivacyPolicy.jsx";
import RecentSellingProduct from "../Pages/Dashboard/RecentSellingProduct/RecentSellingProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      // {
      //   path: "/serviceproviders",
      //   element: <ServiceProvidersList />,
      // },

      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/recent-selling-products",
        element: <RecentSellingProduct />,
      },

      {
        path: "/orderDetails",
        element: <OrderDetails />,
      },
      {
        path: "/earnings",
        element: <Earnings />,
      },

      {
        path: "/returnPolicy",
        element: <ReturnPolicy />,
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy />,
      },

      // {
      //   path: "/terms-and-conditions",
      //   element: <TermsAndCondition />,
      // },

      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },

      {
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
