
import { Routes, Route, Navigate } from "react-router-dom";

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
import SingleRequestDetails from "./pages/SingleRequestDetails";
import LandingPage from "./pages/LandingPage";
import AddDepartment from "./pages/AddDepartment";
import UserRegisterRequests from "./pages/UserRegisterRequests";
import UserRequestDetail from "./pages/UserRequestDetail";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
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
          <Route path="/" element={<Navigate to={"/booking"} />} />
          <Route path="/pending" element={<UserRequests />} />
          <Route path="/booking" element={<MakeRequest />} />
          <Route path="/add-new-car" element={<AddNewCar />} />
          <Route path="/add-new-driver" element={<AddNewDriver />} />
          <Route path="/available-car" element={<MakeRequest />} />
          <Route path="/requests" element={<AllRequests />} />
          <Route path="/request/:id" element={<SingleRequestDetails />} />
          <Route path="/user-request" element={<UserRegisterRequests />} />
          <Route path="/user-request/:id" element={<UserRequestDetail />} />

          <Route path="/add-department" element={<AddDepartment />} />
        </Route>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;