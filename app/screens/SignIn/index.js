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
import React, { useState, useCallback, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import getUser from "../../selectors/UserSelectors";
import { login, actionTypes } from "../../actions/UserActions";
import { isLoadingSelector } from "../../selectors/StatusSelectors";
import errorsSelector from "../../selectors/ErrorSelectors";
import DeviceInfo from "react-native-device-info";
const { authentication } = AuthActions;
const successInit = {
  id: true,
  password: true,
};

const SignIn = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  // const [id, setId] = useState("test");
  // const [password, setPassword] = useState("123456");
  // const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);

  const isLoading = useSelector((state) =>
    isLoadingSelector([actionTypes.LOGIN], state)
  );
  // const errors = useSelector((state) =>
  //   errorsSelector([actionTypes.LOGIN], state)
  // );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState([]);
  const user = useSelector((state) => getUser(state));
  console.log("user di sign in", user);

  //
  const loginUser = useCallback(
    () => dispatch(login(email, password)),
    [email, password, dispatch]
  );

  const passwordChanged = useCallback((value) => setPassword(value), []);
  const emailChanged = useCallback((value) => setEmail(value), []);
  // const onLogin = () => {
  //   if (id == "" || password == "") {
  //     setSuccess({
  //       ...success,
  //       id: false,
  //       password: false,
  //     });
  //   } else {
  //     setLoading(true);
  //     dispatch(
  //       authentication(true, (response) => {
  //         if (response.success && id == "test" && password == "123456") {
  //           navigation.navigate("Home");
  //           // setLoading(false);
  //           // console.log("navigasi apasi ini", navigation);
  //         } else {
  //           setLoading(false);
  //         }
  //       })
  //     );
  //   }
  // };
  useEffect(() => {
    console.log("datauser", user);
  });
  useEffect(() => {
    if (user !== null && user !== undefined) {
      // console.log("use effec nav", user);
      props.navigation.navigate("Home");
    }
  });

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("sign_in")}
        // renderLeft={() => {
        //   return (
        //     <Icon
        //       name="angle-left"
        //       size={20}
        //       color={colors.primary}
        //       enableRTL={true}
        //     />
        //   );
        // }}
        // onPressLeft={() => {
        //   navigation.goBack();
        // }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={offsetKeyboard}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.contain}>
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={emailChanged}
            onFocus={() => {
              setSuccess({
                ...success,
                id: true,
              });
            }}
            autoCorrect={false}
            placeholder={t("username")}
            placeholderTextColor={
              success.id ? BaseColor.grayColor : colors.primary
            }
            value={email}
            selectionColor={colors.primary}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={passwordChanged}
            onFocus={() => {
              setSuccess({
                ...success,
                password: true,
              });
            }}
            autoCorrect={false}
            placeholder={t("input_password")}
            secureTextEntry={true}
            placeholderTextColor={
              success.password ? BaseColor.grayColor : colors.primary
            }
            value={password}
            selectionColor={colors.primary}
          />
          <View style={{ width: "100%", marginVertical: 16 }}>
            <Button
              full
              loading={isLoading}
              style={{ marginTop: 20 }}
              // onPress={onLogin}
              onPress={loginUser}
              // onPress={buttonLogin}
            >
              {t("sign_in")}
            </Button>
          </View>
          <View style={styles.contentActionBottom}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text body2 grayColor>
                {t("forgot_your_password")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text body2 primaryColor>
                {t("not_have_account")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
