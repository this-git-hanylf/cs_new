import {
  SafeAreaView,
  Text,
  Button,
  //new home
  HeaderImage,
  CategoryBoxMenusGrid,
  HeaderLargeTitleStore,
  HeaderLargeTitleBadge,
  HeaderAnimated,
  Icon,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from "@data";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, View, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";

import { MenusData } from "@data";

const Home = (props) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const { t } = useTranslation();

  const scrollY = useRef(new Animated.Value(0)).current;
  const [topics, setTopics] = useState(HomeTopicData);
  const [channels, setChannels] = useState(HomeChannelData);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  const [category, setCategory] = useState(MenusData);

  const user = useSelector((state) => getUser(state));
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
    }
  );

  // const getAboutUs = async () => {
  //   try {
  //     // const datasAboutUs = await axios(API_URL + '')
  //     const datasAboutUs = await axios(
  //       "http://34.87.121.155:8000/ifcaprop-api/api/about/"
  //     );
  //     setdataAboutUs(datasAboutUs.data);
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // };

  const getAboutUs = async () => {
    console.log("dataTowerUser", dataTowerUser);
    const params = {
      // entity_cd: dataTowerUser.entity_cd,
      // project_no: dataTowerUser.project_no,
      entity_cd: "01",
      project_no: "01",
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setUserName(user.Data.name);

    //aku mau naro state nama ke setusername
  });

  const goPost = (item) => () => {
    console.log("item passing", item);
    console.log("item passing screen", item.screen);
    //kalo ambil dari url api database, formatnya kayak gini
    navigation.navigate(item.screen, { item: item });
  };

  const gotoProfil = (item) => () => {
    navigation.navigate("Profile", { item: item });
  };

  const goPostDetail = (item) => () => {
    navigation.navigate("PostDetail", { item: item });
  };

  const goToCategory = () => {
    navigation.navigate("Category");
  };

  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      <View style={{ flex: 1 }}>
        <HeaderAnimated
          style={{ paddingBottom: 0, marginBottom: 0 }}
          scrollY={scrollY}
          // componentLeft={<HeaderLargeTitleStore />}
          componentLeft={
            <View style={{ paddingHorizontal: 0 }}>
              <Text header bold style={{ marginTop: 5 }}>
                Pakubuwono
                {/* ini adalah hardcode gabisa ikut ganti bahasa */}
              </Text>
              {/* <Text subhead grayColor style={{ marginTop: 5 }}>
            {t("discover_last_news_today")}
          </Text> */}
              <Text subhead grayColor style={{ marginTop: 5 }}>
                Make everyday extraordinary
                {/* ini adalah hardcode gabisa ikut ganti bahasa */}
              </Text>
              <Text>{user.Data.name}</Text>
            </View>
          }
          componentRight={
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  margin: 15,
                }}
              >
                <TouchableOpacity
                  hitSlop={{
                    top: 4,
                    left: 4,
                    right: 4,
                    bottom: 4,
                  }}
                  onPress={gotoProfil()}
                  // onPress={onPress}
                >
                  <Icon
                    solid
                    name="user"
                    color={BaseColor.grayColor}
                    size={24}
                  ></Icon>
                  {/* <View
                    style={[styles.badge, { backgroundColor: colors.primary }]}
                  /> */}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  margin: 15,
                }}
              >
                <TouchableOpacity
                  hitSlop={{
                    top: 4,
                    left: 4,
                    right: 4,
                    bottom: 4,
                    justifyContent: "space-between",
                  }}
                  // onPress={onPress}
                >
                  <Icon
                    solid
                    name="bell"
                    color={BaseColor.grayColor}
                    size={24}
                  ></Icon>
                  {/* <View
                    style={[styles.badge, { backgroundColor: colors.primary }]}
                  /> */}
                </TouchableOpacity>
              </View>
            </View>

            // <HeaderLargeTitleBadge
            //   onPress={() => navigation.navigate("ENotification")}
            // />
          }
          // componentBottom={
          //   <TouchableOpacity onPress={goSearch}>
          //     <TextInput
          //       autoCorrect={false}
          //       placeholder={t("enter_keywords")}
          //       value={search}
          //       editable={false}
          //       pointerEvents="none"
          //     />
          //   </TouchableOpacity>
          // }
        />
        <Animated.ScrollView
          style={{ marginTop: 0, paddingTop: 0 }}
          // contentContainerStyle={styles.paddingSrollView}
          onScroll={onScroll}
        >
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              marginTop: 0,
              paddingTop: 0,
            }}
          >
            <HeaderImage
              loading={loading}
              onPress={goPostDetail(mainNews)}
              // style={{ marginTop: 5 }}
              image={mainNews.image}
            />

            <View
              style={{
                backgroundColor: BaseColor.abumuda_pkbw,
                borderRadius: 15,
                marginHorizontal: 10,
                marginVertical: 20,
                height: 70,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={{ fontSize: 11 }}>INVOICE DUE</Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Rp. 10.000.000
                  </Text>
                </View>
                <View>
                  <Text style={{ textAlign: "right", fontSize: 11 }}>
                    TOTAL
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Rp. 15.000.000
                  </Text>
                </View>
              </View>
            </View>

            <FlatList
              key={4}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ margin: 5 }}
              numColumns={4}
              data={category}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <CategoryBoxMenusGrid
                  key={index}
                  loading={loading}
                  style={{
                    // paddingLeft: index % 2 == 0 ? 0 : 10,
                    margin: 0,
                    paddingBottom: 15,
                  }}
                  title={item.title}
                  icon={item.icon}
                  color={item.color}
                  image={item.image}
                  onPress={goPost(item)}
                />
              )}
            />
          </ScrollView>
        </Animated.ScrollView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "top", "left"]}
      >
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Home;
