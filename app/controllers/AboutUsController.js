// getDetail = async (app_user, modules) => {
//   try {
//     const result = await httpClient.request({
//       url: `/menu/${app_user}/${modules}`,
//       method: "GET",
//     });
//     return result;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

import axios from "axios";
import httpClient from "./HttpClient";
import { Platform } from "react-native";
//tidak dipakai ini controler
class AboutUsController {
  constructor() {
    this.basePath = "";
    //   "http://34.87.121.155:8181/apiwebifca/api" + "/login_mobile";
  }

  getAboutUs = async () => {
    try {
      const result = await httpClient.request({
        //   url: `/menu/${userId}`,
        url: `http://34.87.121.155:8000/ifcaprop-api/api/about/`,
        method: "GET",
      });
      //   console.log("result about us", result);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new AboutUsController();
