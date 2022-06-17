import { loginFailure, loginStart, loginSuccess, logoutGo } from "./userRedux";
import { removeProduct } from "./cartRedux";
import { publicRequest } from "../../../../requestMethods";
import swal from "sweetalert";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/user/login", user);
    localStorage.setItem("user-token", res.data.token);
    dispatch(loginSuccess(res.data));
    swal({
      title: "Success",
      text: "Logged in successfully!",
      icon: "success",
    }).then(() => {
      window.location.reload();
    });
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutGo());
  localStorage.removeItem("user-name");
  localStorage.removeItem("user-token");
  swal({
    title: "Logged out!",
    text: "",
    icon: "success",
  }).then(() => {
    window.location.reload();
  });
};
export const removeCartItems = async (dispatch) => {
  dispatch(removeProduct());
};
