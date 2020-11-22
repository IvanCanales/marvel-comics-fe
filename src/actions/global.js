import { COMIC_CHANGE, USER_CHANGE, CHARACTER_CHANGE } from "./types";

const changeUser = (user) => {
  return {
    type: USER_CHANGE,
    payload: { user },
  };
};

const changeComic = (comic) => {
  return {
    type: COMIC_CHANGE,
    payload: { comic },
  };
};

const changeCharacter = (character) => {
  return {
    type: CHARACTER_CHANGE,
    payload: { character },
  };
};

export { changeUser, changeComic, changeCharacter };
