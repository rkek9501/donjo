import React, { useEffect } from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import moment from "moment";
moment.locale("ko");

import ContainerWrapper from "Container/index";
import CustomModal from "Container/modal";
import useDBStore from "./store/dbConnection";

const App = () => { 
  const initDBConnection = useDBStore((state: any) => state.initConnection);
  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    initDBConnection();
  }, []);

  return (<SafeAreaProvider>
    <SafeAreaView style={styles.root} >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ContainerWrapper />
      <CustomModal/>
    </SafeAreaView>
  </SafeAreaProvider>);
};

const styles = StyleSheet.create({
  root: {
    zIndex: 0,
    flex: 1,
    paddingHorizontal: 0,
  },
});

export default App;
