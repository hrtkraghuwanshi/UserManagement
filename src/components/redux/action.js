export const getusers = (users) => {
  return {
    type: "GET_USERS",
    payload: users,
  };
};

export const getuser = (user) => {
  return {
    type: "GET_USER",
    payload: user,
  };
};
export const searchProducts =(data) => {
  return {
    type: "SEARCH_PRODUCTS",
    payload:data,
  };
};
export const DeleteUser =(data) => {
  return {
    type: " DELETE_USER",
    payload:data,
  };
};
export const AddUser =(data) => {
  return {
    type: " ADD_USER",
    payload:data,
  };
};
export const EditUser =(data) => {
  return {
    type: " EDIT_USER",
    payload:data,
  };
};
