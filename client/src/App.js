
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register/index";
import Login from "./pages/Login/index";
import Request from "./pages/Request";
import axios from "axios";
import SideBar from "./components/SideBar";
import styled from "styled-components";
import Layout from "./layout";
import AddNewCar from "./pages/addNewCar";
import AddNewDriver from "./pages/AddNewDriver";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Request />} />
          <Route path="/history" element={<Request />} />
          <Route path="/pending" element={<AddNewCar />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;








