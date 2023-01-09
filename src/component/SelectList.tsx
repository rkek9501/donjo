import React from "react";
import { View, FlatList } from "react-native";
import { Group, Member } from "DB/entities";

type List = Group[] | Member[];
type SelectListProps = {
  type: "member" | "group";
  data: List;
  setSelecteds: (list: List) => void;
  createable?: boolean;
};

const SelectList = (Props: SelectListProps) => {
  return <FlatList
    data={Props.data}
    renderItem={(data) => null}
   />;
};

export default SelectList;