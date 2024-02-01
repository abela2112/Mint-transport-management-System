import axios from "axios";
import {
  getAllUsersFetch,
  getAllUsersSuccess,
} from "../redux/features/userlist";

export const addDriver = (driver) =>
  axios.post("/api/driver/add-new-driver", driver);
export const TransportManagerResponseapi = (data) =>
  axios.post("/api/TMresponse/add-new-response", data);

//auth methods api
export const signUp = (user) => axios.post("/api/user/register", user);
export const signIn = (user) => axios.post("/api/user/login", user);
export const forgotPasswordApi = (data) =>
  axios.post("api/forgot/forgot-password", data);
export const getResetPassword = (id, token) =>
  axios.get(`api/forgot/reset-password/${id}/${token}`);
export const postBackForgotPassword = (id, token, password) =>
  axios.post(`api/forgot/change-password/${id}/${token}`, { password });

//user api
export const getAllUserApi = () => axios.get("/api/user");
export const getSingleUser = (id) => axios.get(`api/user/${id}`);
export const editUser = (id, edit) => axios.patch(`api/user/${id}`, edit);
export const getAlluser = (dispatch) => {
  dispatch(getAllUsersFetch());
  getAllUserApi()
    .then(({ data }) => {
      console.log(">>> data", data);
      dispatch(getAllUsersSuccess(data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(getAllUsersFetch());
    });
};

//request api
export const createRequest = (request) =>
  axios.post("/api/request/reqPost", request);

export const getUserRequests = (userId) =>
  axios.get(`/api/request/user/${userId}`);

export const getAllRequests = () => axios.get(`/api/request?checked=true`);
export const getAllPetrolRequests = () => axios.get(`/api/petrol-request`);
export const getAPetrolRequest = (id) => axios.get(`api/petrol-request/${id}`);
export const getRequestById = (id) => axios.get(`/api/request/${id}`);
export const updateRequestById = (id, request) =>
  axios.patch(`/api/request/updateRequest/${id}`, request);

//user request api
export const getUserRegisterRequests = (userId) =>
  axios.get(`/api/user/${userId}`);
export const getAllUserRegisterRequests = () => axios.get(`/api/user`);
export const updateUserRegisterRequestById = (id, request) =>
  axios.patch(`/api/user/${id}`, request);

//response api
export const UserRequestResponseapi = (id) =>
  axios.get(`/api/TMresponse/user/${id}`);
export const getRequestResponseapiById = (id) =>
  axios.get(`/api/TMresponse/${id}`);
export const UpdateResponse = (responseId, data) =>
  axios.patch(`/api/TMresponse/notify/${responseId}`, data);

//car api
export const getAvailableCar = (avalableCar) => axios.get("/api/car/available");
export const updateCarStatus = (id, status) =>
  axios.patch(`/api/car/update/${id}`, status);
export const addCar = (car) => axios.post("/api/car/add-new-car", car);

//departments api
export const getAllDepartment = () => axios.get("/api/department/getAll");
export const addDept = (dept) =>
  axios.post("/api/department/add-department", dept);

//update petrol request
export const updateAPetrolRequest = (id, data) =>
  axios.put("/api/petrol-request/" + id, data);
export const postPetrolRequest = (data) =>
  axios.post("/api/petrol-request", data);