import { HOME } from "./types";
const initialState = { list: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case HOME.GET_GIT_REPO:
      return {
        ...state,
        [action.field]: action.val
      };
    default:
      return state;
  }
}
