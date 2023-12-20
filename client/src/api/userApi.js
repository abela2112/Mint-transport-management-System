import axios from "axios";
import {
  loginUserFailure,
  loginUserFetch,
  loginUserSuccess,
} from "../redux/features/user";
import {
  getAllUsersFetch,
  getAllUsersSuccess,
} from "../redux/features/userlist";
export const getAllUserApi = () => axios.get("/api/user");
export const signUp = (user) => axios.post("/api/user/register", user);
export const getSingleUser=(id)=>axios.get(`api/user/${id}`)
export const forgot = (data) => axios.post("api/forgot/forgot-password", data);
export const getResetPassword = (id, token) =>
  axios.get(`api/forgot/reset-password/${id}/${token}`);
export const postBack = (id, token, password) =>
  axios.post(`api/forgot/change-password/${id}/${token}`, { password });

export const getAllDepartment=()=>axios.get("/api/department/getAll")

export const addCar = (car) => axios.post("/api/car/add-new-car", car);
export const staffRequest=(request)=>axios.post("api/staff-request/staff-petrol-request",request)
export const signIn = (user) => axios.post("/api/user/login", user);
export const addDriver = (driver) =>
  axios.post("/api/driver/add-new-driver", driver);
export const TransportManagerResponseapi = (data) =>
  axios.post("/api/TMresponse/add-new-response", data);

export const addDept=(dept)=>axios.post("/api/department/add-department",dept)

export const editUser=(id,edit) => axios.patch(`api/user/${id}`,edit)

export const UserRequestResponseapi = (id) =>
  axios.get(`/api/TMresponse/user/${id}`);
export const getRequestResponseapiById = (id) =>
  axios.get(`/api/TMresponse/${id}`);
export const UpdateResponse = (responseId, data) =>
  axios.patch(`/api/TMresponse/notify/${responseId}`, data);

export const login = (dispatch, navigate, user) => {
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

export const createRequest = (request) =>
  axios.post("/api/request/reqPost", request);

export const getUserRequests = (userId) =>
  axios.get(`/api/request/user/${userId}`);

export const getUserRegisterRequests = (userId) =>
  axios.get(`/api/user/${userId}`);
export const getAllRequests = () => axios.get(`/api/request?checked=true`);
export const getAllPetrolRequests = () => axios.get(`/api/staff-request/getAll`);
export const getAPetrolRequest=(id)=>axios.get(`api/staff-request/${id}/getOne`)
export const getRequestById = (id) => axios.get(`/api/request/${id}`);
export const updateCarStatus=(id,status)=>axios.patch(`/api/car/update/${id}`,status)
export const getAvailableCar=(avalableCar)=>axios.get('/api/car/available')
export const updateAPetrolRequest=(id,data)=>axios.put(`/api/staff-request/${id}`,data)

export const updateRequestById = (id, request) =>
  axios.patch(`/api/request/updateRequest/${id}`, request);

export const getAllUserRegisterRequests = () => axios.get(`/api/user`);
export const updateUserRegisterRequestById = (id, request) =>
  axios.patch(`/api/user/${id}`, request);
