import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, View, StyleSheet } from "react-native";
import { NavigationContext } from "@react-navigation/native";

import { ScreenWidth, TabHeaderHeight, MainHeight, ThemeColors } from "../../styles";
import Button from "Component/Button";
import { MemberCard, GroupCard } from "Component/Card";
import { Plus } from "Component/Icons";
import { SelectorType, SortDropdown, SortKey, TypeSelector } from "Component/MemberFilter";
import Text from "Component/Text";

import useSort from "Hook/useSort";

import { Group, Member } from "DB/entities";
import useDBStore, { DBConnectionStoreTypes } from "Store/dbConnection";
import { BottomSheetStoreTypes } from "Store/bottomSheet";
import useRoutesStore, { RoutesStoreTypes } from "Store/routes";

const MemberHeader = (Props: { selector: SelectorType, onOpen: any }) => {
  return <View style={[styles.headerContainer]}>
    <Text  fontStyle="bold" style={styles.headerTitle}>멤버 관리하기</Text>
    <Button small
      title="추가하기"
      postIcon={<Plus size={13} />}
      style={{ width: 124, height: 40 }}
      onPress={() => {
        if (Props.selector === "member") Props.onOpen("member", undefined, 9);
        if (Props.selector === "group") Props.onOpen("group", undefined, 7);
      }}
    />
  </View>
};

const MemberMain = (Props: BottomSheetStoreTypes) => {
  const navigation = useContext(NavigationContext);
  const { groups, members } = useDBStore((states: DBConnectionStoreTypes) => states);
  const [selector, setSelector] = useState<SelectorType>("group");
  const [sort, setSort] = useState<SortKey>("recent");
  const { setRequest } = useRoutesStore((state: RoutesStoreTypes) => state);
  
  const onPressSelector = useCallback(() => {
    setSelector(selector === "group" ? "member" : "group");
  }, [selector])

  const onPressLoadAndStart = useCallback(() => {
    navigation?.navigate("LoadMember");
    setRequest({ purpose: "calc", callback: (data: any) => {
      console.log("return",{data});
    } });
  }, [navigation, setRequest]);

  return <View style={[styles.mainContainer]}>
    <MemberHeader selector={selector} onOpen={Props.onOpen} />
    <View style={styles.filterContainer}>
      <TypeSelector type={selector} onPress={onPressSelector} />
      <SortDropdown sortKey={sort} setSort={setSort} />
    </View>
    
    {selector === "group" && <GroupList sortKey={sort} groups={groups} />}
    {selector === "member" && <MemberList sortKey={sort} members={members} />}

    <Button round
      disabled={(selector === "group" && !groups?.length)||(selector === "member" && !members?.length)}
      title="불러가기"
      style={styles.loadMemberBtn}
      onPress={onPressLoadAndStart}
    />
  </View>
};

const GroupList = (Props: { sortKey: SortKey; groups?: Group[]; }) => {
  const [sorted, setData] = useSort(Props.groups || [], Props.sortKey);
  const reloadGroups = useDBStore((state: DBConnectionStoreTypes) => state.reloadGroups);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setData(Props.groups || [])
  }, [Props.groups]);

  return <>{sorted
    ? sorted?.length > 0
      ?  <FlatList
          style={styles.listContainer}
          refreshing={isRefreshing}
          onRefresh={async() => {
            setRefreshing(true);
            await reloadGroups();
            setRefreshing(false);
          }}
          data={sorted}
          numColumns={1}
          renderItem={(data: any) => <GroupCard key={data.index} {...data.item} />}
        />
      : <Text fontStyle="bold" style={styles.noDataText}>아직 저장된 그룹이 없습니다.</Text>
    : <ActivityIndicator size={50} style={{marginTop: 100}} />
  }</>;
};

const MemberList = (Props: { sortKey: SortKey; members?: Member[] }) => {
  const [sorted, setData] = useSort(Props.members || [], Props.sortKey);
  const reloadMembers = useDBStore((state: DBConnectionStoreTypes) => state.reloadMembers);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setData(Props.members || [])
  }, [Props.members]);

  return <>{sorted
    ? sorted?.length > 0
      ? <FlatList
        style={styles.listContainer}
        refreshing={isRefreshing}
        onRefresh={async() => {
          setRefreshing(true);
          await reloadMembers();
          setRefreshing(false);
        }}
        data={sorted}
        numColumns={2}
        renderItem={(data: any) => <MemberCard key={data.index} {...data.item} size="all" />}
      />
      : <Text fontStyle="bold" style={styles.noDataText}>아직 저장된 멤버가 없습니다.</Text>
    : <ActivityIndicator size={50} style={{marginTop: 100}} />
  }</>;
};

const styles = StyleSheet.create({
  mainContainer: {
    width: ScreenWidth,
    height: MainHeight,
    backgroundColor: "white",
  },
  headerContainer: {
    height: TabHeaderHeight,
    backgroundColor: ThemeColors.red,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  filterContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  listContainer: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 80,
    height: "100%",
  },
  noDataText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#777777",
    textAlign: "center",
    marginTop: 80,
  },
  loadMemberBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 16,
    marginBottom: 16,
  }
});

export default MemberMain;
