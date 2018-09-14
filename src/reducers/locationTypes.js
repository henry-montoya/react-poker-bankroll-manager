const locationTypes = (state = [], action) => {
  switch (action.type) {
    case "ADD_LOCATION_TYPES":
      return [...state, ...action.locationTypes];
    default:
      return state;
  }
};

export default locationTypes;
