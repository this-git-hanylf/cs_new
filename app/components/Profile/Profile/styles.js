import { BaseColor } from "@config";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contain: { flexDirection: "row" },
  contentLeft: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 10,
  },
  contentRight: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  point: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 9,
    bottom: 0,
  },
});
