import Icon from "@components/Icon";
import Text from "@components/Text";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import styles from "./styles";
import Loading from "./Loading";

const CategoryBoxMenusGrid = (props) => {
  const { title, icon, color, style, onPress, loading, image, isImageRound } =
    props;

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.imageBackground,
          {
            backgroundColor: color,
            justifyContent: "center",
            alignContent: "center",
          },
        ]}
        borderRadius={15}
      >
        <Image
          source={image}
          style={StyleSheet.flatten([
            styles.imageWishlist,
            isImageRound && styles.imageRound,
          ])}
        />
      </View>

      {/* <View style={styles.viewIcon}>
        <Icon name={icon} size={18} style={styles.icon} />
      </View> */}
      <Text whiteColor bold style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

CategoryBoxMenusGrid.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
};

CategoryBoxMenusGrid.defaultProps = {
  onPress: () => {},
  style: {},
  title: "",
  icon: "book",
  color: "#FF8A65",
};

export default CategoryBoxMenusGrid;
