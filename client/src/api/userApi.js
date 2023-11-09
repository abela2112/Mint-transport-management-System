import axios from "axios";
import {
  loginUserFailure,
  loginUserFetch,
  loginUserSuccess,
} from "../redux/features/user";

export const signUp = (user) => axios.post("/api/user/register", user);


export const forgot=(data)=> axios.post("api/forgot/forgot-password",data)
export const getResetPassword=(id,token)=>axios.get(`api/forgot/reset-password/${id}/${token}`)
export const postBack = (id, token, password) => axios.post(`api/forgot/change-password/${id}/${token}`, { password });


export const addCar = (car) => axios.post("/api/car/add-new-car", car);
export const signIn = (user) => axios.post("/api/user/login", user);
export const addDriver = (driver) =>
  axios.post("/api/driver/add-new-driver", driver);
export const TransportManagerResponseapi = (data) =>
  axios.post("/api/TMresponse/add-new-response", data);

export const UserRequestResponseapi = (id) =>
  axios.get(`/api/TMresponse/user/${id}`);
export const getRequestResponseapiById = (id) =>
  axios.get(`/api/TMresponse/${id}`);
export const UpdateResponse = (responseId, data) =>
  axios.patch(`/api/TMresponse/notify/${responseId}`, data);

export const login = (dispatch,navigate, user) => {

  dispatch(loginUserFetch());
  signIn(user)
    .then(({ data }) => {
      console.log(">>>", data);
      dispatch(loginUserSuccess(data));

      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch(loginUserFailure());
    });
};

export const createRequest = (request) =>
  axios.post("/api/request/reqPost", request);

export const getUserRequests = (userId) =>
  axios.get(`/api/request/user/${userId}`);

export const getUserRegisterRequests = (userId) =>
  axios.get(`/api/user/${userId}`);
export const getAllRequests = () => axios.get(`/api/request?checked=true`);
export const getRequestById = (id) => axios.get(`/api/request/${id}`);


  export const getAllRequests = () => axios.get(`/api/request?all=true`);
  
  export const getAllUser=()=> axios.get('api/user')

export const updateRequestById = (id, request) =>
  axios.patch(`/api/request/updateRequest/${id}`, request);

export const getAllUserRegisterRequests = () => axios.get(`/api/user`);
export const updateUserRegisterRequestById = (id, request) =>
  axios.patch(`/api/user/${id}`, request);
