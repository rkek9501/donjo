import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import type { Connection } from "typeorm/browser";;
import moment from "moment";
moment.locale("ko");

import connectDB from "DB/entities/index";

import BottomSheet from "Component/BottomSheet";
import ContainerWrapper from "Container/index";
import CustomModal from "Container/modal/index";

const App = () => { 
  const [connection, setconnection] = useState<Connection | null>(null);

  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    try {
      (async () => {
        const connection = await connectDB();
        setconnection(connection);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ContainerWrapper />
      {/* <CustomModal/> */}
      {/* <BottomSheet /> */}
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
