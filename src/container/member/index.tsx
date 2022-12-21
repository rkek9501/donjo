import React, { useCallback, useState } from 'react';
import { FlatList, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Button from 'Component/Button';

import useDBStore from "Store/dbConnection";
import useBSStore, { BottomSheetStoreTypes } from "Store/bottomSheet";
import MemberResolver from 'DB/resolvers/member';
import { Member } from 'DB/entities';

import { ScreenWidth, cardBgColors, TabHeaderHeight, MainHeight } from "../../styles";
import { MemberCard, GroupCard } from 'Component/Card';
import { Down, Layer } from 'Component/Icons';

const MemberHeader = () => {
  const { onOpen } = useBSStore((state: BottomSheetStoreTypes) => state);
  const reload = useDBStore((state: any) => state.reload);

  const addMember = useCallback(async(newMember: Member) => {
    // const resolver = new MemberResolver();
    // const created = await resolver.createMember({
    //   name: newMember.name,
    //   bank: newMember.bank || undefined,
    //   account: newMember.account || undefined,
    //   groups: newMember.groups || [],
    // });
    // // console.log({ created });
    // reload();
  }, []);

  return <View style={[styles.headerContainer]}>
    <Text style={styles.headerTitle}>멤버 추가하기</Text>
    <Button
      title='추가하기 +'
      style={{ width: 124, height: 40 }}
      onPress={() => onOpen("member", (newMember: any) => addMember(newMember), 9)}
    />
  </View>
};

type SelectorType = "member" | "group";
const TypeSelector = (Props: { type: SelectorType; onPress: (e: GestureResponderEvent)=>void }) => {
  return <TouchableOpacity
    style={{
      backgroundColor: "#D9D9D9",
      flexDirection: "row",
      alignItems: "center",
      height: 30,
      borderRadius: 15,
      paddingHorizontal: 12,
      width: Props.type === "member" ? 114 : 104,
      justifyContent: "space-between",
    }}
    onPress={Props.onPress}
  >
    <Text style={{color:"#505050",fontSize:12,fontFamily:"SCDream4"}}>{Props.type === "member" ? "그룹으로" : "멤버로"} 보기</Text>
    <Layer />
  </TouchableOpacity>
};

const SortValues = {
  recent: "최근 사용 순서",
  nameAsc: "이름순",
  nameDesc: "이름역순",
}
type SortKey = "recent" | "nameAsc" | "nameDesc";

const SortDropdown = (Props: { sortKey: SortKey; setSort: (key: SortKey) => void; }) => {
  const [open, setOpen] = useState(false);

  return <View style={{position: "relative", minWidth: 120}}>
    <TouchableOpacity
      onPress={(e: GestureResponderEvent) => setOpen(!open)}
      style={{
        height: 30,
        backgroundColor: "#D9D9D9",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        borderRadius: 4,
      }}
    >
      <Text style={{color:"#505050",fontSize:12,marginRight: 8,fontFamily:"SCDream4"}}>{SortValues?.[Props.sortKey] || "순서"}</Text>
      <Down/>
    </TouchableOpacity>
    {open && <View style={{position:"absolute", backgroundColor: "white", minWidth:120, minHeight:40,top:30,zIndex:1}}>
      <FlatList
        data={[
          {value: "recent", text: SortValues.recent},
          {value: "nameAsc", text: SortValues.nameAsc},
          {value: "nameDesc", text: SortValues.nameDesc}
        ]}
        renderItem={(data: any) => {
          console.log({ data })
          return <TouchableOpacity key={data.index} onPress={() => {
            Props.setSort(data.item.value);
            setOpen(false);
          }}>
            <Text style={{paddingHorizontal: 4,paddingVertical: 8,fontSize:12,fontFamily:"SCDream4"}}>{data.item.text}</Text>
          </TouchableOpacity>
        }}
      />
    </View>}
  </View>
};

const MemberMain = () => {
  const memberList = useDBStore((states: any) => states.members);
  const groupList = useDBStore((states: any) => states.groups);
  const [selector, setSelector] = useState<SelectorType>("group");
  const [sort, setSort] = useState<SortKey>("recent");

  const onPressSelector = useCallback(() => {
    setSelector(selector === "group" ? "member" : "group");
  }, [selector])

  return <View style={[styles.mainContainer]}>
    <MemberHeader/>
    <View style={styles.filterContainer}>
      <TypeSelector type={selector} onPress={onPressSelector} />
      <SortDropdown sortKey={sort} setSort={setSort} />
    </View>

    {selector === "member" && <FlatList
      style={styles.listContainer}
      data={memberList}
      numColumns={2}
      renderItem={(data: any) => <MemberCard key={data.index} {...data.item} size="all" />}
    />}
    {selector === "group" && <FlatList
      style={styles.listContainer}
      data={groupList}
      numColumns={1}
      renderItem={(data: any) => <GroupCard key={data.index} {...data.item} />}
    />}
  </View>
};

const styles = StyleSheet.create({
  mainContainer: {
    width: ScreenWidth,
    height: MainHeight,
    backgroundColor: "white",
  },
  headerContainer: {
    height: TabHeaderHeight,
    backgroundColor: cardBgColors[1],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16
  },
  headerTitle: {
    color: "white",
    fontFamily: "SCDream6",
    fontWeight: 'bold',
    fontSize: 20,
  },
  filterContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  listContainer: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 10
  }
});

export default MemberMain;
