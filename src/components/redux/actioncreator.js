import axios from "axios";

import { AddUser, EditUser, getuser, getusers, sortusers } from "./action";
export const Userlist = (limit,skip,firstname,order) => {
  // console.log(limit,skip);
  return async (dispatch) => {
    try {
      const res = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}&sortBy=${firstname}&order=${order}`);
      dispatch(getusers(res.data));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};

export const User = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`https://dummyjson.com/users/${id}`);
      dispatch(getuser(res.data));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};
export const deleteusers = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`https://dummyjson.com/users/${id}`);
      dispatch(getuser(res.data));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};
export const addusers = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("https://dummyjson.com/users/add", payload);
      dispatch(AddUser(res.data));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};
export const editusers = (id,payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`https://dummyjson.com/users/${id}`,payload);
      // console.log(res.data);
      dispatch(EditUser(res.data));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};
export const SearchUser = (query) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/users/search?q=${query}`
      );
      dispatch(getusers(res.data));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};
