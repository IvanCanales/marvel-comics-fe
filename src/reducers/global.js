import { CHARACTER_CHANGE, COMIC_CHANGE, USER_CHANGE } from "../actions/types";

const INITIAL_STATE = {
  user: null,
  comic: null,
  character: null,
};

const global = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CHANGE:
      return Object.assign({}, state, {
        user: action.payload.user,
      });
    case COMIC_CHANGE:
      return Object.assign({}, state, {
        comic: action.payload.comic,
      });
    case CHARACTER_CHANGE:
      return Object.assign({}, state, {
        character: action.payload.character,
      });
    default:
      return state;
  }
};

export default global;
