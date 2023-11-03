import axios from "axios";
import {
  loginUserFailure,
  loginUserFetch,
  loginUserSuccess,
} from "../redux/features/user";

export const signUp = (user) => axios.post("/api/user/register", user);
export const addCar =(car)=> axios.post("api/car/add-new-car",car)
export const signIn =(user)=> axios.post("/api/user/login", user);
export const addDriver=(driver)=> axios.post("api/driver/add-new-driver", driver)

export const login = (dispatch,navigate, user) => {
  dispatch(loginUserFetch());
  signIn(user)
    .then(({ data }) => {
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

export const getAllRequests = () => axios.get(`/api/request`);

export const getRequestById = (id) => axios.get(`/api/request/${id}`);

export const updateRequestById = (id, request) =>
  axios.patch(`/api/request/updateRequest/${id}`, request);
