import Icon from "@components/Icon";
import Image from "@components/Image";
import Text from "@components/Text";
import { BaseColor, useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function ProfileDetail(props) {
  const { colors } = useTheme();
  const {
    style,
    image,
    styleLeft,
    styleThumb,
    styleRight,
    onPress,
    textFirst,
    point,
    textSecond,
    textThird,
    icon,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.contentLeft, styleLeft]}>
        <View>
          <Image source={image} style={[styles.thumb, styleThumb]} />
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{textFirst}</Text>
        <Text
          body2
          style={{
            marginTop: 3,
            paddingRight: 10,
          }}
          numberOfLines={1}
        >
          {textSecond}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

ProfileDetail.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  textFirst: PropTypes.string,
  point: PropTypes.string,
  textSecond: PropTypes.string,
  textThird: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.bool,
  onPress: PropTypes.func,
};

ProfileDetail.defaultProps = {
  image: "",
  textFirst: "",
  textSecond: "",
  icon: true,
  point: "",
  style: {},
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => {},
};
