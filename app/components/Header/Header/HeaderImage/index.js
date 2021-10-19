import ProfileAuthor from "@components/Profile/Author";
import Text from "@components/Text";
import { BaseColor, Images } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Loading from "./Loading";

const HeaderImage = (props) => {
  const { name, description, title, image, style, avatar, onPress, loading } =
    props;
  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        borderRadius={8}
      ></ImageBackground>
    </TouchableOpacity>
  );
};

HeaderImage.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  avatar: PropTypes.node.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
};

HeaderImage.defaultProps = {
  style: {},
  image: Images.news,
  avatar: Images.profile2,
  name: "",
  description: "",
  title: "",
  onPress: () => {},
};

export default HeaderImage;
