import {
  SET_SELECTED_ENCOUNTER,
  RESET_SELECTED_ENCOUNTER
} from "./types";

const initState = {
  selectedEncounter: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SELECTED_ENCOUNTER:
      return {
        ...state,
        selectedEncounter: action.payload
      };
    case RESET_SELECTED_ENCOUNTER:
      return {
        ...state,
        selectedEncounter: null
      };
    default:
      return state;
  }
};

export default reducer;
