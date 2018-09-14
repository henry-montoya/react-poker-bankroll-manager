const users = (state = [], action) => {
  switch (action.type) {
    case "ADD_USERS":
      return [...state, ...action.users];
    default:
      return state;
  }
};

export default users;
