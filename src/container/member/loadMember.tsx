import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-flex-layout";

import { ThemeColors } from "src/styles";
import Button from "Component/Button";
import { Group as GroupIcon, Bank, Check, Person, CircleCrossWithBg } from "Component/Icons";
import SearchHeader from "Component/SearchHeader";
import Text from "Component/Text";
import { SelectorType, SortDropdown, SortKey, TypeSelector } from "Component/MemberFilter";
import BottomSheet from "Container/bottomSheet";

import useDBStore, { DBConnectionStoreTypes } from "Store/dbConnection";
import useRoutesStore, { RoutesStoreTypes } from "Store/routes";
import { BottomSheetStoreTypes, useInnerBSStore } from "Store/bottomSheet";

import useCheckableList, { Checkable, CheckableGroup, CheckableMember } from "Hook/useCheckableList";

const MemberItem = (Props: CheckableMember) => {
  const groupLength: number = Props.groups?.length || 0;
  const groupName = groupLength > 1
    ? `${Props.groups?.[0].name} 외${(Props.groups?.length||0) - 1}개`
    : groupLength === 1
      ? Props.groups?.[0].name
      : "그룹없음";

  return <View style={{paddingVertical: 12, paddingHorizontal:8, flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
    <View>
      <Text fontStyle="bold">{Props.name}</Text>
      <View style={{flexDirection:"row", marginTop: 10, alignItems: "center"}}>
        <GroupIcon />
        <Text style={{marginHorizontal: 4, fontSize:14}}>{groupName}</Text>
        {(Props.bank || Props.account) && <>
          <Bank />
          <Text style={{marginLeft: 4, fontSize:14}}>
            {Props.bank}
            {Props.bank && Props.account && " | "}
            {Props.account}
          </Text>
        </>}
      </View>
    </View>
    <TouchableOpacity onPress={() => Props.setChecked?.(Props)}>
      <Check checked={Props.checked} />
    </TouchableOpacity>
  </View>
};

const GroupItem = (Props: CheckableGroup) => {
  const memberLength: number = Props.members?.length || 0;

  return <View style={{paddingVertical: 12, paddingHorizontal:16, flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
    <View>
      <Text fontStyle="bold">{Props.name}</Text>
      <View style={{flexDirection:"row", marginTop: 10, alignItems: "center"}}>
        <Person />
        <Text style={{marginLeft: 4, fontSize:14}}>
          {memberLength}명
          {memberLength > 0 && " | "}
          {Props.members?.map((mem) => mem.name)}
        </Text>
      </View>
    </View>
    <TouchableOpacity onPress={() => Props.setChecked?.(Props)}>
      <Check checked={Props.checked} />
    </TouchableOpacity>
  </View>;
}

const Nodata = (Props: { selector: SelectorType }) => {
  return <Text fontStyle="bold" style={{fontSize:18, textAlign: "center", marginTop: 60}}>
    아직 저장된 {Props.selector === "group" ? "그룹이" : "멤버가"} 없습니다.
  </Text>;
};

const MemberCircle = (Props: any) => {
  return <View style={{height: 52, width: 52, marginRight: 12}}>
    <View style={{height: 52, width: 52, borderRadius: 26, backgroundColor: "black", justifyContent: "center", alignItems: "center"}} >
      <Text style={{color: "white"}}>{Props.name}</Text>
    </View>
    <TouchableOpacity style={{position: "absolute", top: 0, right: 0}} onPress={Props.onPressRemove}>
      <CircleCrossWithBg bgColor={ThemeColors.whiteBlack[200]} crossColor={ThemeColors.whiteBlack[600]} />
    </TouchableOpacity>
  </View>;
}
const GroupCircle = (Props: any) => {
  return <View style={{height: 52, width: 58, marginRight: 12}}>
    <View style={{ zIndex: 4, height: 52, width: 52, borderRadius: 26, backgroundColor: "black", justifyContent: "center", alignItems: "center"}} >
      <Text style={{color: "white"}}>{Props.name}</Text>
    </View>
    <View style={{ zIndex: 3, left: 3, position: "absolute", height: 52, width: 52, borderRadius: 26, backgroundColor: ThemeColors.whiteBlack[400], justifyContent: "center", alignItems: "center"}} />
    <View style={{ zIndex: 2, left: 6, position: "absolute", height: 52, width: 52, borderRadius: 26, backgroundColor: ThemeColors.whiteBlack[300], justifyContent: "center", alignItems: "center"}} />
    <TouchableOpacity style={{ zIndex: 5, position: "absolute", top: 0, right: 0}} onPress={Props.onPressRemove}>
      <CircleCrossWithBg bgColor={ThemeColors.whiteBlack[200]} crossColor={ThemeColors.whiteBlack[600]} />
    </TouchableOpacity>
  </View>;
}

const LoadMember = () => {
  const navigation = React.useContext(NavigationContext);
  const bsState: BottomSheetStoreTypes = useInnerBSStore((state: any) => state);
  
  const { purpose, callback } = useRoutesStore((state: RoutesStoreTypes) => state);
  const { groups, members, reloadGroups, reloadMembers } = useDBStore((states: DBConnectionStoreTypes) => states);

  const [search, setSearch] = useState<string>("");
  const [selector, setSelector] = useState<SelectorType>("group");
  const [sort, setSort] = useState<SortKey>("recent");

  const [{
    searchedList: groupList,
    checkedList: checkedGroup,
  }, {
    setCheckedByItem: setCheckedGroup,
    setSearch: searchingGroup,
    setSort: setGroupSort,
    updateList: updateGroupList
  }] = useCheckableList<CheckableGroup>(groups || []);

  const [{
    searchedList: memberList,
    checkedList: checkedMember,
  }, {
    setCheckedByItem: setCheckedMember,
    setSearch: searchingMember,
    setSort: setMemberSort,
    updateList: updateMemberList
  }] = useCheckableList<CheckableMember>(members || []);

  const subTitle = useMemo(() => {
    if (purpose !== "group") {
      let cnt = 0;
      if (checkedGroup.length > 0) {
        cnt += (checkedGroup as CheckableGroup[]).reduce((pre, curr) => pre + (curr?.members?.length || 0), 0);
      }
      if (checkedMember.length > 0) {
        cnt += (checkedMember as CheckableMember[]).length;
      }
      return `${purpose==="calc" ? "총 " : ""}${cnt} 명`;
    } else {
      return `${checkedGroup?. length || 0} 개`
    }
  }, [purpose, checkedGroup, checkedMember]);
  
  useEffect(() => {
    return () => bsState.onClose();
  }, []);

  useEffect(() => {
    if (groups && groups.length > 0) updateGroupList(groups)
  }, [groups]);

  useEffect(() => {
    if (members && members.length > 0) updateMemberList(members)
  }, [members]);

  useEffect(() => {
    if (purpose && purpose !== "calc") {
      setSelector(purpose);
    }
  }, [purpose]);

  useEffect(() => {
    searchingGroup(search);
    searchingMember(search);
  }, [search]);

  useEffect(() => {
    setGroupSort(sort);
    setMemberSort(sort);
  }, [sort]);

  const onPressSelector = useCallback(() => {
    setSelector(selector === "group" ? "member" : "group");
  }, [selector]);

  const btnCase = useMemo(() => {
    if (purpose === "group") {
      if (selector === "group" && groupList.length === 0 && search.trim().length > 0) return 11; // 검색어 그룹 생성
      if (checkedGroup.length > 0) return 12; // 그룹 불러가기
    } else if (purpose === "member") {
      if (selector === "member" && memberList.length === 0 && search.trim().length > 0) return 21; // 검색어 그룹 생성
      if (checkedMember.length > 0) return 22; // 그룹 불러가기
    } else {
      if (checkedGroup.length > 0 || checkedMember.length >0) return 31; // 불러가기
    }
    return 0; // 버튼 생성 X
  }, [purpose, selector, groupList, memberList, checkedMember, checkedGroup, search]);

  const buttonTitle = useMemo(() => {
    switch(btnCase) {
      case 11: return `'${search}'그룹 생성하기`;
      case 12: return "그룹 불러가기";
      case 21: return `'${search}'멤버 생성하기`;
      case 22: return "멤버 불러가기";
      default: return "불러가기";
    }
  }, [btnCase, search]);

  const onPressBottomBtn = useCallback(() => {
    switch (btnCase) {
      case 11: {
        bsState.onOpen("group", () => reloadGroups(), 9, { name: search, type: "inner" });
      }; break;
      case 21: {
        bsState.onOpen("member", () => reloadMembers(), 9, { name: search, type: "inner" });
      }; break;
      default: {
        const params: any = {
          groups: checkedGroup,
          members: checkedMember,
        };
        if (purpose === "group") delete params.members;
        if (purpose === "member") delete params.groups;
        callback?.(params);
        navigation?.goBack();
      }; break;
    }
  }, [btnCase, bsState, checkedMember, checkedGroup, reloadGroups, reloadMembers, callback, navigation]);

  return <View style={styles.container}>
    <SearchHeader
      title={`${purpose === "group" ? "그룹 " : purpose === "member" ? "멤버 " :""}불러가기`}
      subTitle={subTitle}
      bgColor={ThemeColors.red}
      search={search}
      setSearch={setSearch}
      onPressBack={() => navigation?.goBack()}
    >
      {(checkedGroup.length > 0 || checkedMember.length > 0) && <ScrollView style={{flexDirection: "row", height: 88, paddingVertical: 8}} horizontal={true}>
        {checkedGroup.length > 0 && checkedGroup.map((group: Checkable, key: number) => {
          return <GroupCircle key={key} {...group} onPressRemove={() => setCheckedGroup(group)}/>
        })}

        {checkedMember.length > 0 && checkedMember.map((member: Checkable, key: number) => {
          return <MemberCircle key={key} {...member} onPressRemove={() => setCheckedMember(member)}/>
        })}
      </ScrollView>}
    </SearchHeader>

    <View style={styles.contents}>
      <View style={[styles.filterContainer, {flexDirection:"row-reverse"}]}>
        <SortDropdown sortKey={sort} setSort={setSort} />
        {/* <TypeSelector type={selector} onPress={onPressSelector} /> */}
        {purpose === "calc" && <TypeSelector type={selector} onPress={onPressSelector} />}
      </View>
        
      <FlatList
        style={{paddingHorizontal: 8}}
        data={selector === "group" ? groupList : memberList}
        ListEmptyComponent={() => <Nodata selector={selector} />}
        ItemSeparatorComponent={() => <Divider color={ThemeColors.whiteBlack[200]} />}
        renderItem={(data: ListRenderItemInfo<CheckableMember | CheckableGroup | any>) => {
          if (selector === "group") return <GroupItem key={data.index} {...data.item} setChecked={setCheckedGroup}/>;
          return <MemberItem key={data.index} {...data.item} setChecked={setCheckedMember} />
        }}
      />

      {btnCase !== 0 && <Button round title={buttonTitle} onPress={onPressBottomBtn}/>}

    </View>
    {bsState.open && <BottomSheet {...bsState}/>}
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.white
  },
  contents: {
    flex: 1,
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
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
});

export default LoadMember;
