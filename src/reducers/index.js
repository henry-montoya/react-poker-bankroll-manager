import { combineReducers } from "redux";
import games from "./games";
import gameTypes from "./gameTypes";
import limitTypes from "./limitTypes";
import stakes from "./stakes";
import locations from "./locations";
import locationTypes from "./locationTypes";
import users from "./users";
import currentUser from "./currentUser";

export default combineReducers({
  games,
  gameTypes,
  limitTypes,
  stakes,
  locations,
  locationTypes,
  users,
  currentUser
});
