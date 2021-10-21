import {
  SafeAreaView,
  Text,
  Button,
  //new home
  HeaderImage,
  CategoryBoxMenusGrid,
} from "@components";
import { BaseColor, BaseStyle } from "@config";
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from "@data";
import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";

import { MenusData } from "@data";

const Home = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const [topics, setTopics] = useState(HomeTopicData);
  const [channels, setChannels] = useState(HomeChannelData);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  const [category, setCategory] = useState(MenusData);

  const user = useSelector((state) => getUser(state));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setUserName(user.Data.name);
  });

  const goPost = (item) => () => {
    navigation.navigate("Post", { item: item });
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
      <SafeAreaView>
        <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
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
        </View>
        <ScrollView contentContainerStyle={styles.paddingSrollView}>
          <HeaderImage
            loading={loading}
            onPress={goPostDetail(mainNews)}
            style={{ marginTop: 5 }}
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
                <Text style={{ textAlign: "right", fontSize: 11 }}>TOTAL</Text>
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

          <TouchableOpacity onPress={gotoProfil()}>
            <Text>bt</Text>
          </TouchableOpacity>

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
                onPress={goPost}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
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
