const games = (state = [], action) => {
  switch (action.type) {
    case "ADD_GAMES":
      return [...state, ...action.games];
    default:
      return state;
  }
};

export default games;
