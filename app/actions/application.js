import AboutUsController from "../controllers/AboutUsController";
import * as actionTypes from "./actionTypes";

const changeTheme = (theme) => {
  return {
    type: actionTypes.CHANGE_THEME,
    theme,
  };
};

const changeFont = (font) => {
  return {
    type: actionTypes.CHANGE_FONT,
    font,
  };
};

const forceTheme = (force_dark) => {
  return {
    type: actionTypes.FORCE_APPEARANCE,
    force_dark,
  };
};

const changeLanguage = (language) => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language,
  };
};

const aboutUs = (datas) => {
  return {
    type: actionTypes.ABOUT_US,
    datas,
  };
};

export const onChangeTheme = (theme) => (dispatch) => {
  dispatch(changeTheme(theme));
};

export const onForceTheme = (mode) => (dispatch) => {
  dispatch(forceTheme(mode));
};

export const onChangeFont = (font) => (dispatch) => {
  dispatch(changeFont(font));
};

export const onChangeLanguage = (language) => (dispatch) => {
  dispatch(changeLanguage(language));
};

export const getAboutUs = (datas) => async (dispatch) => {
  dispatch(aboutUs(datas));
  try {
    const datas = await AboutUsController.getAboutUs(datas);
    // console.log("aplication about us", datas);
    dispatch(aboutUs(datas));
  } catch (error) {
    dispatch(aboutUs(error));
  }
};
