import { StyleSheet } from "react-native";
import { BaseColor, BaseStyle, useTheme } from "@config";

export default StyleSheet.create({
  paddingSrollView: { padding: 20 },
  paddingFlatList: {
    paddingTop: 24,
  },
  topicsView: {
    marginVertical: 24,
  },
  title: { marginBottom: 5 },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BaseColor.whiteColor,
    position: "absolute",
    right: -2,
  },
});
