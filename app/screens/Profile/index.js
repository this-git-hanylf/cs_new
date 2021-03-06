import { AuthActions } from "@actions";
import {
  Button,
  Icon,
  ProfileDetail,
  ProfilePerformance,
  SafeAreaView,
  Tag,
  Text,
} from "@components";
import { BaseStyle, useTheme, BaseColor } from "@config";
// Load sample data
import { UserData } from "@data";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
const { authentication } = AuthActions;

import getUser from "../../selectors/UserSelectors";

const Profile = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(UserData[0]);
  const auth = useSelector((state) => state.auth);
  const login = auth.login.success;

  const user = useSelector((state) => getUser(state));
  console.log("user profil", user);

  /**
   * @description Simple logout with Redux
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onLogOut = () => {
    setLoading(true);
    dispatch(
      authentication(false, (response) => {
        setLoading(false);
      })
    );
  };

  const onLogIn = () => {
    // alert("login");
    navigation.navigate("SignIn");
  };

  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <View style={{ flex: 1 }}>
        {/* <View style={{ marginBottom: 20 }}>
          <Text header bold style={{ color: BaseColor.hijau_pkbw }}>
            {t("profile")}
          </Text>
        </View> */}
        <View style={{ flex: 1 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                backgroundColor: BaseColor.milo_pkbw,
                paddingVertical: 60,
              }}
            >
              {login && (
                <ProfileDetail
                  image={{ uri: user.Data.pict }}
                  textFirst={user.Data.name}
                  point={userData.point}
                  textSecond={user.Data.Group}
                  // onPress={() => {}}
                />
              )}
            </View>

            {/* {login && (
              <View style={styles.viewFollow}>
                <View style={{ flex: 3 }}>
                  <Tag primary style={styles.follow} styleText={{}}>
                    + {t("follow")}
                  </Tag>
                </View>

                <View style={{ flex: 5 }}>
                  <ProfilePerformance data={userData.performance} />
                </View>
              </View>
            )} */}
            <View style={[BaseStyle.container, { flex: 1 }]}>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("Setting");
                }}
              >
                <Text body1>{t("setting")}</Text>
                {/* <Text>{"halo"}</Text> */}
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("AboutUs");
                }}
              >
                <Text body1>{t("about_us")}</Text>

                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("AboutUs");
                }}
              >
                <Text body1>{t("about_us")}</Text>

                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("AboutUs");
                }}
              >
                <Text body1>{t("about_us")}</Text>

                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate("AboutUs");
                }}
              >
                <Text body1>{t("about_us")}</Text>

                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>

              {/* {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate("ProfileEdit");
                  }}
                >
                  <Text body1>{t("edit_profile")}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )} */}
              {/* {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate("ChangePassword");
                  }}
                >
                  <Text body1>{t("change_password")}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )} */}

              {/* {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate("EBank");
                  }}
                >
                  <Text body1>{t("payments")}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )} */}

              {/* {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate("EAddress");
                  }}
                >
                  <Text body1>{t("billing_address")}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )} */}

              {/* {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate("EWishlist");
                  }}
                >
                  <Text body1>{t("product_wishlist")}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )} */}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        {login ? (
          <Button full loading={loading} onPress={() => onLogOut()}>
            {t("sign_out")}
          </Button>
        ) : (
          <Button full loading={loading} onPress={() => onLogIn()}>
            {t("sign_in")}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
