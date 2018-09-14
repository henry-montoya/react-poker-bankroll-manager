const stakes = (state = [], action) => {
  switch (action.type) {
    case "ADD_STAKES":
      return [...state, ...action.stakes];
    default:
      return state;
  }
};

export default stakes;
