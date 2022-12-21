import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import moment from "moment";
moment.locale("ko");

import BottomSheet from "Container/bottomSheet";
import ContainerWrapper from "Container/index";
import CustomModal from "Container/modal";
import useDBStore from "./store/dbConnection";
import useBSStore from "Store/bottomSheet";

const App = () => { 
  const initDBConnection = useDBStore((state: any) => state.initConnection);
  const bsOpen = useBSStore((state: any) => state.open)

  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    initDBConnection();
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ContainerWrapper />
      <CustomModal/>
      {bsOpen && <BottomSheet />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    zIndex: 0,
    flex: 1,
    paddingHorizontal: 0
  },
});

export default App;
