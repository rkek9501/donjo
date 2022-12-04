import React, { useState, Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";

const generateIndex = (maxIdx: number) => {
  return [...Array(maxIdx)].map((_, i) => i+1);
}

type IndexProps = {
  isActive: boolean;
  index: number;
}

const Index = (props:IndexProps) => {
  const ContainerBg = { backgroundColor: props.isActive ? "#F8503E66" : "#E8E8E866" };
  const TextBg = { backgroundColor: props.isActive ? "#F8503E" : "#E8E8E866" };

  return <View style={[styles.indexContainer, ContainerBg]}>
    <Text style={[styles.indexText, TextBg]}>
      {props.index.toFixed(0).toString()}
    </Text>
  </View>
}

type IndicatorProps = {
  activeIndex: number;
  maxIdx: number;
};

const Indicator = (props: IndicatorProps) => {
  const [indexes] = useState(generateIndex(props.maxIdx));
  
  return <View style={[styles.indicatorContainer]}>
    {indexes.map((idx => <Fragment key={idx}>
      {idx !== 1 && <View style={styles.dash} />}
      <Index isActive={props.activeIndex === idx} index={idx} />
    </Fragment>))}
  </View>
}

const styles = StyleSheet.create({
  indicatorContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 20,
    margin: 4,
  },
  indexContainer: {
    flexDirection: "row",
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  indexText: {
    width: 16,
    height: 16,
    borderRadius: 8,
    fontSize: 10,
    margin: 0,
    padding: 0,
    color: "white",
    textAlign: "center",
  },
  dash: {
    flexDirection: "row",
    display: "flex",
    width: 5,
    height: 2,
    backgroundColor: "#E8E8E866"
  }
});

export default Indicator;
