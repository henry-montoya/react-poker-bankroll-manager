const limitTypes = (state = [], action) => {
  switch (action.type) {
    case "ADD_LIMIT_TYPES":
      return [...state, ...action.limitTypes];
    default:
      return state;
  }
};

export default limitTypes;
