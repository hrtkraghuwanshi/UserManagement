import axios from "axios";

import { getuser, getusers } from "./action";
export const Userlist = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      dispatch(getusers(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};  
export const User = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      dispatch(getuser(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};
