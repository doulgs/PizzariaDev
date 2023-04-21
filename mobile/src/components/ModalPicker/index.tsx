import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { CategoryProps } from "../../pages/Order";

interface ModalPickerProps {
  title: string;
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryProps) => void;
}

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

export function ModalPicker({
  title,
  options,
  handleCloseModal,
  selectedItem,
}: ModalPickerProps) {
  function onPressItem(item: CategoryProps) {
    selectedItem(item);
    handleCloseModal();
  }

  const option = options.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.option}
      onPress={() => onPressItem(item)}
    >
      <Text style={styles.item}>{item?.name}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flex: 1 }} onPress={handleCloseModal} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#2b2b43",
    width: WIDTH,
    height: HEIGHT - 400,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  title: {
    textAlign: "center",
    width: WIDTH,
    fontSize: 24,
    paddingVertical: 12,
    color: "#FFF",
    borderBottomWidth: 0.7,
    borderBottomColor: "#8a8a8a",
  },
  option: {
    alignItems: "flex-start",
    borderBottomWidth: 0.7,
    borderBottomColor: "#8a8a8a",
  },
  item: {
    margin: 20,
    fontSize: 18,
    color: "#fafafa",
  },
});
