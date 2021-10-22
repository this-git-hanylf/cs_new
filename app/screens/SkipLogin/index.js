import { AuthActions } from "@actions";
import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Images } from "@config";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import getUser from "../../selectors/UserSelectors";
import { login, actionTypes } from "../../actions/UserActions";
import { isLoadingSelector } from "../../selectors/StatusSelectors";
import errorsSelector from "../../selectors/ErrorSelectors";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
import Swiper from "react-native-swiper";
import * as Utils from "@utils";

let imagesInit = [
  {
    id: 1,
    image: Images.productGrid06,
  },
  {
    id: 2,
    image: Images.productGrid01,
  },
  {
    id: 3,
    image: Images.productGrid04,
  },
  {
    id: 4,
    image: Images.productGrid03,
  },
  {
    id: 5,
    image: Images.productGrid05,
  },
  {
    id: 6,
    image: Images.productGrid06,
  },
];

const { authentication } = AuthActions;
const successInit = {
  id: true,
  password: true,
};

const SkipLogin = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [dataAboutUs, setdataAboutUs] = useState([]);
  const [dataTowerUser, setdataTowerUser] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  //   const user = useSelector((state) => getUser(state));

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const getTower = async () => {
    // let email = user.Data.user;

    const data = {
      email: "guest@ifca.co.id",
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
        console.log("data tower", res.data);
        const datas = res.data;
        setdataTowerUser(res.data);
        getAboutUs(datas);
        // return res.data;
      })
      .catch((error) => {
        console.log("error get tower api", error.response);
        alert("error get");
      });
  };

  const getAboutUs = async (datas) => {
    // console.log("dataTowerUser", datas);
    const params = {
      entity_cd: datas.Data[0].entity_cd,
      project_no: datas.Data[0].project_no,
      //   entity_cd: "01",
      //   project_no: "01",
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
        console.log("data about us", res.data.data);
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
    // getAboutUs();
  }, []);

  const onSelect = (indexSelected) => {};

  const images = [{ id: 0, image: Images.productGrid06 }].concat(imagesInit);

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    useNativeDriver: true,
  });

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("skip_login")}
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
        <View>
          <View
            backgroundColor={BaseColor.hijau_pkbw}
            style={{
              height: 150,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                marginHorizontal: 50,
                fontWeight: "bold",
                fontSize: 22,
                color: BaseColor.whiteColor,
              }}
            >
              Pakubuwono
            </Text>
            <Text
              style={{
                marginHorizontal: 50,
                width: 200, //dihardcode karena ingin mengikuti design
                fontSize: 18,
                color: BaseColor.whiteColor,
              }}
            >
              Setting a banchmark for luxury living in Jakarta
            </Text>
          </View>

          <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            <Animated.View
              style={[
                styles.headerImageStyle,
                {
                  opacity: headerImageOpacity,
                  height: heightViewImg,
                },
              ]}
            >
              <Swiper
                dotStyle={{
                  backgroundColor: BaseColor.dividerColor,
                  marginBottom: 8,
                }}
                activeDotStyle={{
                  marginBottom: 8,
                }}
                paginationStyle={{ bottom: 0 }}
                loop={false}
                activeDotColor={colors.primary}
                removeClippedSubviews={false}
                onIndexChanged={(index) => onSelect(index)}
              >
                {images.map((item, key) => {
                  return (
                    <TouchableOpacity
                      key={key}
                      style={{ flex: 1 }}
                      activeOpacity={1}
                      //   onPress={() =>
                      //     navigation.navigate("PreviewImage", { images: images })
                      //   }
                    >
                      <Image
                        key={key}
                        style={{ flex: 1, width: "100%", borderRadius: 10 }}
                        source={item.image}
                      />
                    </TouchableOpacity>
                  );
                })}
              </Swiper>
            </Animated.View>
            <View style={{ alignSelf: "center", paddingTop: 10 }}>
              <Text>"Once Upon Your Lifetime..."</Text>
            </View>
          </View>

          <View style={{ padding: 20, height: "100%" }}>
            {/* ----- DESC ---- */}
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
                  <View
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: BaseColor.hijau_pkbw,
                      }}
                    >
                      {/* {t("contact_us")} */}
                      THE PAKUBUWONO RESIDENCE
                    </Text>
                    <View
                      style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                        width: "65%",
                      }}
                    ></View>
                    <Text
                      style={{
                        marginTop: 5,
                        width: "100%",
                        textAlign: "justify",
                      }}
                      numberOfLines={0}
                    >
                      {/* {item.about_us.replace(/<\/?[^>]+(>|$)/g, "")} */}
                      2BR - Ironwood & Cottonwood Tower (Semi Gross : 177m²) 2BR
                      - Eaglewood, Basswood & Sandalwood Tower (Semi Gross :
                      203m²) 3BR - Ironwood & Cottonwood Tower (Semi Gross :
                      245m²) 3BR - Eaglewood, Basswood & Sandalwood Tower (Semi
                      Gross : 303m²) {"\n"} Inspired by the 1950’s Art Deco
                      history and tradition of the Kebayoran Baru district, The
                      Pakubuwono Residence is expressed in 5 distinguished
                      24-storeyed towers placed on 4.2 hectares of land. Only
                      about 7400 square meters of the land is occupied by
                      structure, leaving the remaining 80% developed into lush
                      landscape areas reflecting the modern luxurious lifestyle.
                      Residents can enjoy the serenity and security of living
                      surrounded by spacious greenery designed for relaxation,
                      exercise and socializing while being located in the middle
                      of the city. The interior design of the residences can be
                      described as modern classical, reflecting the property's
                      five–star level of service and amenities.
                    </Text>
                  </View>
                </View>
              );
            })}

            {/* ------ CONTACT US --- */}
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                marginBottom: 10,
              }}
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
        </View>
      </ScrollView>
    </SafeAreaView>
    // <View>
    //   <ScrollView
    //     onContentSizeChange={() => {
    //       setHeightHeader(Utils.heightHeader());
    //     }}
    //   >

    //     {/* <Animated.View
    //       style={[
    //         styles.headerImageStyle,
    //         {
    //           opacity: headerImageOpacity,
    //           height: heightViewImg,
    //         },
    //       ]}
    //     >
    //       <Swiper
    //         dotStyle={{
    //           backgroundColor: BaseColor.dividerColor,
    //           marginBottom: 8,
    //         }}
    //         activeDotStyle={{
    //           marginBottom: 8,
    //         }}
    //         paginationStyle={{ bottom: 0 }}
    //         loop={false}
    //         activeDotColor={colors.primary}
    //         removeClippedSubviews={false}
    //         onIndexChanged={(index) => onSelect(index)}
    //       >
    //         {images.map((item, key) => {
    //           return (
    //             <TouchableOpacity
    //               key={key}
    //               style={{ flex: 1 }}
    //               activeOpacity={1}
    //               //   onPress={() =>
    //               //     navigation.navigate("PreviewImage", { images: images })
    //               //   }
    //             >
    //               <Image
    //                 key={key}
    //                 style={{ flex: 1, width: "100%" }}
    //                 source={item.image}
    //               />
    //             </TouchableOpacity>
    //           );
    //         })}
    //       </Swiper>
    //     </Animated.View>
    //   */}
    //   </ScrollView>
    // </View>
  );
};

export default SkipLogin;
