import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import styled from "styled-components";
import SingleRequestDetails from "./components/SingleRequestDetails.jsx";
import Layout from "./layout";
import AddDepartment from "./pages/AdminPages/AddDepartment.jsx";
import ShowAllUserForAdmin from "./pages/AdminPages/ShowAllUserForAdmin.jsx";
// import UserRegisterRequests from "./pages/AdminPages/UserRegisterRequests.jsx";
import UserRequestDetail from "./pages/AdminPages/UserRequestDetail.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import SearchPage from "./pages/SearchPage.jsx";
import History from "./pages/StaffManagerPages/History.jsx";
import StaffMangerPendingRequests from "./pages/StaffManagerPages/StaffMangerPendingRequests.jsx";
import StaffPetrolRequest from "./pages/StaffManagerPages/StaffPetrolRequest.jsx";
import MakeRequest from "./pages/StaffPages/MakeRequest.jsx";
import UserRequests from "./pages/StaffPages/UserRequests.jsx";
import TransManagerResponse from "./pages/TransManagerResponse";
import AddNewDriver from "./pages/TransportManagerPages/AddNewDriver.jsx";
import AllRequests from "./pages/TransportManagerPages/AllRequests.jsx";
import AddNewCar from "./pages/TransportManagerPages/addNewCar.jsx";
import ReponseForSingleRequest from "./pages/StaffPages/ReponseForSingleRequest.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AvailableCar from "./pages/TransportManagerPages/AvailableCar.jsx";

import { useEffect } from "react";
import Notification from "./pages/Notification.jsx";
import Response from "./pages/StaffPages/Response.jsx";
import SinglResponsePage from "./pages/StaffPages/SinglResponsePage.jsx";
import { setNotification } from "./redux/features/user.js";
import ProfilePage from "./pages/ProfilePage.jsx";
import PendingUserRegisterRequests from "./pages/AdminPages/PendingUserRegisterRequests.jsx";
import PendingRequests from "./pages/TransportManagerPages/PendingRequests.jsx";

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
  const user = useSelector((state) => state.user?.user);
  const token = useSelector((state) => state.user?.token);
  const dispatch = useDispatch();
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.headers = {
    Authorization: "Bearer " + token,
    "Content-type": "application/json",
  };

  useEffect(() => {
    token &&
      axios
        .get(`/api/user/${user?._id}`)
        .then(({ data }) => console.log(data))
        .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    let socket = io("http://localhost:5000");
    socket.emit("setup", user);
    socket.on("messagerecieved", (message) => {
      dispatch(setNotification(message));
    });
    socket.on("notification", (message) =>
      console.log("notification", message)
    );
  }, []);

  return (
    <>
      {/* <AlertDisplay open={open} setOpen={setOpen} message={message} /> */}
      <Routes>
        <Route path="/" element={user ? <Layout /> : <Navigate to={"/home"} />}>
          <Route path="/profile" element={<ProfilePage />} />
          {user?.role === "staff" && (
            <Route path="/" element={<StaffLayout />}>
              <Route path="/" element={<Navigate to={"/booking"} />} />
              <Route path="/pending" element={<UserRequests />} />
              <Route path="/history" element={<UserRequests />} />
              <Route path="/request/:id" element={<SingleRequestDetails />} />
              <Route path="/booking" element={<MakeRequest />} />
              <Route path="/response" element={<Response />} />
              <Route path="/response/:id" element={<SinglResponsePage />} />
              <Route
                path="/response/request/:id"
                element={<ReponseForSingleRequest />}
              />
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
              <Route path="/petrol-request" element={<StaffPetrolRequest />} />
              <Route path="/request/:id" element={<SingleRequestDetails />} />
              <Route
                path="/response/request/:id"
                element={<ReponseForSingleRequest />}
              />
            </Route>
          )}

          {user?.role === "transport-manager" && (
            <Route path="/" element={<TransportManagerLayout />}>
              <Route path="/" element={<Navigate to={"/requests"} />} />
              <Route path="/add-new-car" element={<AddNewCar />} />
              <Route path="/pending-requests" element={<PendingRequests />} />
              <Route path="/add-new-driver" element={<AddNewDriver />} />
              <Route path="/available-car" element={<AvailableCar />} />
              <Route path="/requests" element={<AllRequests />} />
              <Route path="/request/:id" element={<SingleRequestDetails />} />
              <Route
                path="/response/request/:id"
                element={<ReponseForSingleRequest />}
              />
            </Route>
          )}

          {user?.role === "admin" && (
            <Route path="/" element={<AdminLayout />}>
              <Route path="/" element={<Navigate to={"/user-list"} />} />

              <Route
                path="/pending-user-register-request"
                element={<PendingUserRegisterRequests />}
              />
              <Route
                path="/user-register-request/:id"
                element={<UserRequestDetail />}
              />

              <Route path="/user-detail/:id" element={<UserRequestDetail />} />
              <Route path="/search/:searchTerm" element={<SearchPage />} />
              <Route path="/department" element={<AddDepartment />} />
              <Route path="/user-list" element={<ShowAllUserForAdmin />} />
            </Route>
          )}
          <Route path="/search/:searchTerm" element={<SearchPage />} />
        </Route>
        <Route
          path="/transportManager-response"
          element={<TransManagerResponse />}
        />
        <Route path="/notification" element={<Notification />} />
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
