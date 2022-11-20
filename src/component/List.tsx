import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Cross } from "./Icons";

const Item = (Props: any) => {
  const { name, description, onPress, onRemove } = Props;
  return <View style={styles.itemContainer}>
    <TouchableOpacity style={styles.itemText} onPress={onPress}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
    </TouchableOpacity>
    {typeof Props.onRemove !== "undefined" && <TouchableOpacity style={styles.itemRemove} onPress={onRemove}>
      <Cross/>
    </TouchableOpacity>}
  </View>
};

const List = (Props: { data: any[], onRemoveItem?: any, onPressItem: any }) => {
  console.log("List", Props.data)
  return <View style={{flex: 1,}}>
    {Props.data?.map((item, key) => <Item
      key={key}
      name={item.name}
      description={item.description}
      onPress={() => Props.onPressItem(item, key)}
      onRemove={typeof Props.onRemoveItem !== "undefined" ? () => Props.onRemoveItem?.(item) : undefined}
    />)}
  </View>
}

export default List;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#F2EDE3",
    marginVertical: 4,
    flexDirection: "row",
  },
  itemText: {
    // height: 50,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    margin: 15,
  },
  itemName: {
    color: "#505050",
    fontSize: 16,
  },
  itemDescription: {
    color: "#848484",
    marginLeft: 8,
    fontSize: 14,
  },
  itemRemove: {
    margin: 15,
  }
});
