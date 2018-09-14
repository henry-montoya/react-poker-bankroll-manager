const locations = (state = [], action) => {
  switch (action.type) {
    case "ADD_LOCATIONS":
      return [...state, ...action.locations];
    default:
      return state;
  }
};

export default locations;
