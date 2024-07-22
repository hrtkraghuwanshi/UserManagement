const initialstate = {
  userslist: [],
  user: [],
  deletelist: [],
  Addlist: [],
  Editlist: [],
  sortedlist:[]
};

export const reducer = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_USERS":
      return {
        ...state,
        userslist: payload,
      };
    
    case "SEARCH_PRODUCTS":
      return {
        ...state,
        userslist: payload,
      };
    case "DELETE_USER":
      return {
        ...state,
        deletelist: payload,
      };
    case "GET_USER":
      return {
        ...state,
        user: payload,
      };
    case "ADD_USER":
      return {
        ...state,
        Addlist: payload,
      };
    case "EDIT_USER":
      return {
        ...state,
        Editlist: payload,
      };
    default:
      return state;
  }
};
