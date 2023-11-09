import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Register from "./pages/Register/index";
import Login from "./pages/Login/index";

import axios from "axios";
import SideBar from "./components/SideBar";
import styled from "styled-components";
import Layout from "./layout";
import AddNewCar from "./pages/addNewCar";
import AddNewDriver from "./pages/AddNewDriver";
import { useSelector } from "react-redux";
import Requests from "./pages/UserRequests";
import MakeRequest from "./pages/MakeRequest";
import UserRequests from "./pages/UserRequests";
import AllRequests from "./pages/AllRequests";
import ShowAllUserForAdmin from './pages/ShowAllUserForAdmin'
import SingleRequestDetails from "./pages/SingleRequestDetails";
import LandingPage from "./pages/LandingPage";
import AddDepartment from "./pages/AddDepartment";
import UserRegisterRequests from "./pages/UserRegisterRequests";
import UserRequestDetail from "./pages/UserRequestDetail";
import TransManagerResponse from "./pages/TransManagerResponse"
import SearchPage from "./pages/SearchPage.jsx";
import StaffMangerPendingRequests from "./pages/StaffMangerPendingRequests";
import History from "./pages/History";
import ForgotPassword from "./pages/ForgotPassword";

import ResetPassword from "./pages/ResetPassword.jsx";

import AvailableCar from "./pages/AvailableCar.jsx";
import UserDetail from "./pages/userDetails.jsx";

const Container = styled.div `
  width: 100%;
  height: 100%;
`;



const StaffLayout = () => (
  <>
    {/* Staff-specific header, nav, etc. */}
    <Outlet /> {/* Staff sub-routes will render here */}
  </>
);

// Layout component for staff-manager
const StaffManagerLayout = () => (
  <>
    {/* Staff-manager-specific header, nav, etc. */}
    <Outlet /> {/* Staff-manager sub-routes will render here */}
  </>
);
const TransportManagerLayout = () => (
  <>
    {/* Staff-manager-specific header, nav, etc. */}
    <Outlet /> {/* Staff-manager sub-routes will render here */}
  </>
);
const AdminLayout = () => (
  <>
    {/* Staff-manager-specific header, nav, etc. */}
    <Outlet /> {/* Staff-manager sub-routes will render here */}
  </>
);

function App() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  console.log(user, token);
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.headers = {
    Authorization: "Bearer " + token,
    "Content-type": "application/json",
  };

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Layout /> : <Navigate to={"/home"} />}>
          {user?.role === "staff" && (
            <Route path="/" element={<StaffLayout />}>
              <Route path="/" element={<Navigate to={"/booking"} />} />
              <Route path="/pending" element={<UserRequests />} />
              <Route path="/history" element={<UserRequests />} />
              <Route path="/request/:id" element={<SingleRequestDetails />} />
              <Route path="/booking" element={<MakeRequest />} />
              <Route path="/search/:searchTerm" element={<SearchPage />} />
            </Route>
          )}
          {user?.role === "staff-manager" && (
            <Route path="/" element={<StaffManagerLayout />}>
              <Route
                path="/"
                element={<Navigate to={"/pending-user-request"} />}
              />
              <Route
                path="/pending-user-request"
                element={<StaffMangerPendingRequests />}
              />
              <Route path="/requests-history" element={<History />} />
              <Route path="/request/:id" element={<SingleRequestDetails />} />
              <Route path="/search/:searchTerm" element={<SearchPage />} />
            </Route>
          )}

          {user?.role === "transport-manager" && (
            <Route path="/" element={<TransportManagerLayout />}>
              <Route path="/" element={<Navigate to={"/requests"} />} />
              <Route path="/add-new-car" element={<AddNewCar />} />
              <Route path="/add-new-driver" element={<AddNewDriver />} />
              <Route path="/available-car" element={<AvailableCar />} />
              <Route path="/requests" element={<AllRequests />} />
              <Route path="/request/:id" element={<SingleRequestDetails />} />
              <Route path="/search/:searchTerm" element={<SearchPage />} />
            </Route>
          )}

          {user?.role === "admin" && (
            <Route path="/" element={<AdminLayout />}>
              <Route path="/" element={<Navigate to={"/user-register-request"} />} />
              <Route path="/user-register-request" element={<UserRegisterRequests />} />
              <Route path="/user-request/:id" element={<UserRequestDetail />} />
              <Route path="/user-detail/:id" element={<UserDetail />} />
              <Route path="/search/:searchTerm" element={<SearchPage />} />
              <Route path="/add-department" element={<AddDepartment />} />
              <Route path="/user-list" element={<ShowAllUserForAdmin />} />
            </Route>
          )}
          
        </Route>
        <Route
          path="/transportManager-response"
          element={<TransManagerResponse />}
        />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}


 

export default App;

