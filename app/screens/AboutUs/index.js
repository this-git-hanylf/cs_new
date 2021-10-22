import {
  Card,
  Header,
  Icon,
  Image,
  ProfileDescription,
  SafeAreaView,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { useSelector, useDispatch } from "react-redux";

import { Images } from "@config";
import { AboutUsData } from "@data";
import * as Utils from "@utils";
import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
// import { selectorsAboutUs } from "../../selectors/AboutUsSelectors";
import { getAboutUs } from "../../actions/application";
import { API_URL } from "@env";
import axios from "axios";

import getUser from "../../selectors/UserSelectors";

function AboutUs(props) {
  const { navigation } = props;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [ourTeam, setOurTeam] = useState(AboutUsData);
  const [dataAboutUs, setdataAboutUs] = useState([]);
  const [dataTowerUser, setdataTowerUser] = useState([]);

  // console.log("dataTowerUser", dataTowerUser);

  const user = useSelector((state) => getUser(state));
  console.log("user skip login", user);

  const getTower = async () => {
    let email = user.Data.user;

    const data = {
      email: email,
      app: "O",
    };

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        // token: "",
      },
    };

    await axios
      .get(
        `http://34.87.121.155:2121/apiwebpbi/api/getData/mysql/${data.email}/${data.app}`,
        {
          config,
        }
      )
      .then((res) => {
        const datas = res.data;
        setdataTowerUser(res.data);
        getAboutUs(datas);
        // return res.data;
      })
      .catch((error) => {
        console.log("error get tower api", error);
        alert("error get");
      });
  };

  const getAboutUs = async (datas) => {
    // console.log("dataTowerUser", datas);
    const params = {
      entity_cd: datas.Data[0].entity_cd,
      project_no: datas.Data[0].project_no,
      // entity_cd: "01",
      // project_no: "01",
    };

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };

    await axios
      .post(`http://34.87.121.155:2121/apiwebpbi/api/about`, params, {
        config,
      })
      .then((res) => {
        setdataAboutUs(res.data.data);
        // return res.data;
      })
      .catch((error) => {
        console.log("error get about us", error.response.data);
        alert("error get");
      });
  };

  useEffect(() => {
    getTower();
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("about_us")}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text headline semibold>
            {t("who_we_are")}
          </Text>
          {dataAboutUs.map((item, index) => {
            return (
              <View
                style={{
                  marginVertical: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  width: "100%",
                  // -- create shadow
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                  backgroundColor: BaseColor.whiteColor,
                  borderRadius: 15,
                }}
              >
                <Text body2 style={{ marginTop: 5 }}>
                  {item.about_us.replace(/<\/?[^>]+(>|$)/g, "")}
                </Text>
              </View>
            );
          })}

          <View
            style={{ alignItems: "center", marginTop: 20, marginBottom: 10 }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: BaseColor.hijau_pkbw,
              }}
            >
              {t("address")}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
              width: "100%",
              // -- create shadow
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
              backgroundColor: BaseColor.whiteColor,
              borderRadius: 15,
            }}
          >
            {dataAboutUs.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <Icon
                    name="map-pin"
                    size={20}
                    color={BaseColor.coklat_pkbw}
                    style={{ marginHorizontal: 10 }}
                  />
                  <Text
                    body2
                    style={{
                      fontSize: 13,
                      textAlign: "justify",
                      paddingRight: 15,
                      paddingTop: 5,
                    }}
                  >
                    {item.address.replace(/<\/?[^>]+(>|$)/g, "")}
                  </Text>
                </View>
              );
            })}
          </View>

          <View
            style={{ alignItems: "center", marginTop: 20, marginBottom: 10 }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: BaseColor.hijau_pkbw,
              }}
            >
              {t("contact_us")}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
              width: "100%",
              // -- create shadow
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
              backgroundColor: BaseColor.whiteColor,
              borderRadius: 15,
            }}
          >
            {dataAboutUs.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <Icon
                    name="user-circle"
                    size={20}
                    color={BaseColor.coklat_pkbw}
                    style={{ marginHorizontal: 10 }}
                  />
                  <Text
                    body2
                    style={{
                      fontSize: 13,
                      textAlign: "justify",
                      paddingRight: 15,
                      paddingTop: 5,
                    }}
                  >
                    {item.contact_name}
                  </Text>
                </View>
              );
            })}

            {dataAboutUs.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <Icon
                    name="envelope"
                    size={20}
                    color={BaseColor.coklat_pkbw}
                    style={{ marginHorizontal: 10 }}
                  />
                  <Text
                    body2
                    style={{
                      fontSize: 13,
                      textAlign: "justify",
                      paddingRight: 15,
                      paddingTop: 5,
                    }}
                  >
                    {item.contact_email}
                  </Text>
                </View>
              );
            })}

            {dataAboutUs.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <Icon
                    name="phone"
                    size={20}
                    color={BaseColor.coklat_pkbw}
                    style={{ marginHorizontal: 10 }}
                  />
                  <Text
                    body2
                    style={{
                      fontSize: 13,
                      textAlign: "justify",
                      paddingRight: 15,
                      paddingTop: 5,
                    }}
                  >
                    {item.contact_no}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AboutUs;
