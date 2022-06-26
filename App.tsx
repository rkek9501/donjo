/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, Component, useRef, useCallback } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TextInput,
  View,
  Text,
  FlatList,
  Button,
} from 'react-native';

import type { Connection } from 'typeorm/browser';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import LineGauge from './src/components/LineGauge';

import connectDB, { Group, Member, Pay, Bill, Dutch } from './src/db/entities';
import ComplexResolver from './src/db/resolvers/complex';
import moment from "moment";

// realm;

const App = () => {
  const [connection, setconnection] = useState<Connection | null>(null);

  const [memberText, setMemberText] = useState<string>('Member');
  const [price, setPrice] = useState<number>(0);
  const [place, setPlace] = useState<string>("장소")
  const [date, setDate] = useState<Date>(new Date())

  const isDarkMode = useColorScheme() === 'dark';

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

  const onPress = async () => {
    console.log({ memberText, price, place, date })
    await new ComplexResolver().create({
      billInput: null,
      payInput: {
        place,
        price,
        date,
      },
      groupInput: null,
      membersInput: [{
        name: memberText
      }],
    })

    const pays = await new ComplexResolver().getPays();
    console.log(JSON.stringify({ pays }, null, 2));
  }

  return (
    <SafeAreaView >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic" > */}
        <View style={styles.inline}>
          <Text>멤버</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMemberText}
            value={memberText}
          />
        </View>
        <View style={styles.inline}>
          <Text>금액</Text>
          <TextInput
            style={styles.input}
            onChangeText={t => setPrice(Number(t))}
            keyboardType="numeric"
            value={`${price}`}
          />
        </View>
        <View style={styles.inline}>
          <Text>장소</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPlace}
            value={place}
          />
        </View>
        <View style={styles.inline}>
          <Text>날짜</Text>
          <TextInput
            style={styles.input}
            onChangeText={d => setDate(moment(d).toDate())}
            value={`${date}`}
          />
        </View>
        <Button
          onPress={onPress}
          title="확인"
          color="lightpink"
        />
        {/* {groupList && groupList.length > 0 && <FlatList
          data={groupList}
          renderItem={renderGroupItem}
          keyExtractor={(item, idx) => `${item._id}-${idx}`}
        />} */}

        {/* <GestureHandlerRootView style={{ flex: 1 }}>
          <LineGauge
            min={100}
            max={1000}
            unitSize={10}
            value={value2}
            onChange={setValue2}
          />
        </GestureHandlerRootView> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  inline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {

  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
