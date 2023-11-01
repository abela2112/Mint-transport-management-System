import axios from "axios";
import {
  loginUserFailure,
  loginUserFetch,
  loginUserSuccess,
} from "../redux/features/user";

export const signUp = (user) => axios.post("/api/user/register", user);
export const addCar =(car)=> axios.post("api/car/add-new-car",car)
export const signIn = (user) => axios.post("/api/user/login", user);
export const addDriver=(driver)=> axios.post("/api/",driver)
export const login = (dispatch, user) => {
  dispatch(loginUserFetch());
  signIn(user)
    .then(({ data }) => dispatch(loginUserSuccess(data)))
    .catch((err) => {
      console.log(err);
      dispatch(loginUserFailure());
    });
};
