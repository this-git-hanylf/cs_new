import axios from "axios";
import httpClient from "./HttpClient";
import { Platform } from "react-native";

class UserController {
  constructor() {
    this.basePath =
      "http://34.87.121.155:8181/apiwebifca/api" + "/login_mobile";
  }

  login = async (email, password) => {
    try {
      const result = await httpClient.request({
        url: `/login_mobile`,
        // url: `${this.basePath}`,
        method: "POST",
        data: {
          email: email,
          password: password,
          token: "",
          token_firebase: "12281812hasdasd", //dummy
          device: Platform.OS === "ios" ? "ios" : "android",
          mac: "092819192929", //dummy
          app: "O",
        },
      });
      // console.log("result login", result);
      if (result.Error) {
        return Promise.reject(result.Pesan);
      } else {
        return result;
      }
    } catch (error) {
      console.log("error login api", error);
      return Promise.reject(error);
    }
  };

  logout = () => null;
}

export default new UserController();
