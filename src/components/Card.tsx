import React, { useCallback, useEffect, useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Animated, {
  useSharedValue, useAnimatedStyle,
  withDelay, withTiming, withSequence
} from "react-native-reanimated";
import usePageStore, { PageStoreTypes } from '../store';
import Button from './Button';
import { NextCard } from './Icons';

const CardDistance = 25;
const MaxWidth = Dimensions.get("screen").width;
const CardWidth = MaxWidth - (CardDistance * 2);
const bgColors = ["#FEBB39", "#F8503E", "#3C7873"];

type Page = 0 | 1 | 2;
type CardWrapperProps = {
  page: Page;
  currPage: Page;
  active: boolean;
  onClickNext: () => void;
  children: React.ReactNode | React.ReactNode[];
};

const CardWrapper = (Props: CardWrapperProps) => {
  const { page, currPage, active, onClickNext, children } = Props;
  const curr = useSharedValue(0);

  const PrevPage = (page + 2) % 3;
  const ThisPage = page;
  const NextPage = (page + 1) % 3;

  useEffect(() => {
    curr.value = currPage;
  }, [currPage])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      zIndex: withDelay(300, withTiming(curr.value === ThisPage ? 3 : curr.value === NextPage ? 1 : 2)),
      width: withTiming(active ? MaxWidth : CardWidth, { duration: 300 }),
      borderTopRightRadius: withTiming(active ? 0 : 30, { duration: 200 }),
      backgroundColor: bgColors[page],
      transform: [{
        translateX: curr.value === NextPage ? withSequence(withTiming(-CardWidth, { duration: 500 }), withTiming(CardDistance*2)) : withTiming(curr.value === PrevPage ? CardDistance : 0),
        // scale: curr.value === 1 ? withSequence(withTiming(0.1, { duration: 200 }), withTiming(1)) : withTiming(1),
      }],
    };
  });
  return <Animated.View style={[styles.cardContainer, animatedStyles]}>
    <View style={[styles.cardWrapper]}>
      {children}
    </View>
    {!active && <TouchableOpacity style={[styles.next]} onPress={onClickNext}>
      <NextCard />
    </TouchableOpacity>}
  </Animated.View>
};

const Card = () => {
  const state = usePageStore((state: PageStoreTypes) => state);
  const { page, setPage, activePage, setActivePage } = state;

  const onClickNext = useCallback(() => {
    console.log({ page })
    const next = (page + 1) % 3;
    setPage(next as Page);
  }, [page]);

  const onClickActive = useCallback((willActivePage) => {
    setActivePage(activePage === -1 ? willActivePage : -1);
  }, [activePage]);

  return <View style={[styles.container]}>
    <CardWrapper page={0} currPage={page} active={activePage === 0} onClickNext={onClickNext}>
      <Text style={[styles.title, {color: "#281B14"}]}>새로운 모임 작성하기</Text>
      <Button title={activePage === -1 ? "in" : "out"} onPress={() => onClickActive(0)} />
    </CardWrapper>
    <CardWrapper page={1} currPage={page} active={activePage === 1} onClickNext={onClickNext}>
      <Text style={[styles.title, {color: "#fff"}]}>멤버 추가하기</Text>
      <Button title={activePage === -1 ? "in" : "out"} onPress={() => onClickActive(1)} />
    </CardWrapper>
    <CardWrapper page={2} currPage={page} active={activePage === 2} onClickNext={onClickNext}>
      <Text style={[styles.title, {color: "#fff"}]}>이전 모임살펴보기</Text>
      <Button title={activePage === -1 ? "in" : "out"} onPress={() => onClickActive(2)} />
    </CardWrapper>
  </View>
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: 166,
  },
  cardContainer: {
    position: "absolute",
    height: 166,
    paddingVertical: 24,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardWrapper: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  pageContainer: {
    
  },
  next: {
    width: 48,
    height: 29,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
})

export default Card;
