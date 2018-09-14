const gameTypes = (state = [], action) => {
  switch (action.type) {
    case "ADD_GAME_TYPES":
      return [...state, ...action.gameTypes];
    default:
      return state;
  }
};

export default gameTypes;
