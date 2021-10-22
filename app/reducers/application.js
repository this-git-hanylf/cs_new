import * as actionTypes from "@actions/actionTypes";
const initialState = {
  theme: null,
  font: null,
  force_dark: null,
  language: null,
  menu: "eCommerce",
  datas: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case actionTypes.CHANGE_FONT:
      return {
        ...state,
        font: action.font,
      };
    case actionTypes.FORCE_APPEARANCE:
      return {
        ...state,
        force_dark: action.force_dark,
      };
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        menu: action.menu,
      };

    case actionTypes.ABOUT_US:
      return {
        ...state,
        datas: action.datas,
      };

    default:
      return state;
  }
};
