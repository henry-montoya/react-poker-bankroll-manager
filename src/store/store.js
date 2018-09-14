// import { createStore } from "redux";

// function reducer(state, action) {
//   if (!state) {
//     return {
//       games: null
//     };
//   }

//   if (action.type === "ADD_GAME") {
//     return {
//       ...state,
//       games: action.games
//     };
//   }
//   // switch (action.type) {
//   //   case "ADD_GAME":
//   //     return [
//   //       ...state,
//   //       {
//   //         id: action.id,
//   //         game: action.game
//   //       }
//   //     ];
//   //   case "ADD_GAME_TYPE":
//   //     return [
//   //       ...state,
//   //       {
//   //         id: action.id,
//   //         gameType: action.gameType
//   //       }
//   //     ];
//   //   case "ADD_LIMIT_TYPE":
//   //     return [
//   //       ...state,
//   //       {
//   //         id: action.id,
//   //         limitType: action.limitType
//   //       }
//   //     ];
//   //   case "ADD_LOCATION":
//   //     return [
//   //       ...state,
//   //       {
//   //         id: action.id,
//   //         location: action.location,
//   //         locationTypeId: action.locationTypeId
//   //       }
//   //     ];
//   //   case "ADD_LOCATION_TYPE":
//   //     return [
//   //       ...state,
//   //       {
//   //         id: action.id,
//   //         locationType: action.locationType
//   //       }
//   //     ];
//   //   case "ADD_STAKE":
//   //     return [
//   //       ...state,
//   //       {
//   //         id: action.id,
//   //         smallBlind: action.smallBlind,
//   //         bigBlind: action.bigBlind,
//   //         thirdBlind: action.thirdBlind
//   //       }
//   //     ];
//   //   case "ADD_USER":
//   //     return [
//   //       ...state,
//   //       {
//   //         id: action.id,
//   //         firstName: action.firstName,
//   //         lastName: action.lastName,
//   //         username: action.username
//   //       }
//   //     ];
//   //   default:
//   //     return state;
//   // }
// }

// export default createStore(reducer);
