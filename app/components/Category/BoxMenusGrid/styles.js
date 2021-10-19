import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
  container: {
    width: "25%",
    paddingHorizontal: 5,
  },
  imageBackground: {
    backgroundColor: "#FF8A65",
    height: 80,
    width: "100%",
    justifyContent: "flex-end",
  },
  title: {
    marginVertical: 5,
    marginHorizontal: 5,
    color: BaseColor.abu_pkbw,
    textAlign: "center",
  },
  imageWishlist: {
    width: Utils.scaleWithPixel(40),
    height: Utils.scaleWithPixel(40),
    borderRadius: 8,

    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  imageRound: {
    width: Utils.scaleWithPixel(80),
    height: Utils.scaleWithPixel(80),
    borderRadius: Utils.scaleWithPixel(80) / 2,
  },
  viewIcon: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
    width: 29,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: BaseColor.whiteColor,
  },
  imageBackgroundLoading: {
    height: 80,
    width: "100%",
    justifyContent: "flex-end",
  },
});
