const currentUser = (state = {}, action) => {
  switch (action.type) {
    case "SELECT_CURRENT_USER":
      return [...state, ...action.currentUser];
    default:
      return state;
  }
};

export default currentUser;
