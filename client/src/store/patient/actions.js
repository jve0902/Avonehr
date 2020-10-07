import {
  SET_SELECTED_ENCOUNTER,
  RESET_SELECTED_ENCOUNTER,
  SET_EDITOR_TEXT,
  RESET_EDITOR_TEXT,
} from "./types";


export const setEncounter = (encounter) => {
  return {
    type: SET_SELECTED_ENCOUNTER,
    payload: encounter,
  };
};

export const resetEncounter = () => {
  return {
    type: RESET_SELECTED_ENCOUNTER
  };
};


export const setEditorText = (value) => {
  return {
    type: SET_EDITOR_TEXT,
    payload: value,
  };
};

export const resetEditorText = () => {
  return {
    type: RESET_EDITOR_TEXT
  };
};
