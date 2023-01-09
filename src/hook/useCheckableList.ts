import { SortKey } from "Component/MemberFilter";
import { Group, Member } from "DB/entities";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import unionBy from "lodash/unionBy";

export interface CheckableMember extends Member {
  checked?: boolean;
  setChecked?: (checked: CheckableMember) => void;
} 
export interface CheckableGroup extends Group {
  checked?: boolean;
  setChecked?: (checked: CheckableGroup) => void;
} 

export type Checkable = CheckableMember | CheckableGroup;

function generateCheckableList<CheckableType extends Checkable>(list: CheckableType[]) {
  return list.map(item => {
    return { ...item, checked: false };
  }) || [];
};

export type UseSelectReturn = [
  {
    searchedList: Checkable[];
    checkedList: Checkable[];
    // hasEqual: boolean;
  },
  {
    setCheckedByItem: Dispatch<SetStateAction<Checkable>>;
    setSearch: Dispatch<SetStateAction<string>>;
    setSort: Dispatch<SetStateAction<SortKey>>;
    updateList: Dispatch<SetStateAction<Checkable[]>>
  }
];

function useCheckableList<CheckableType extends CheckableMember | CheckableGroup>(initialList: CheckableType[]): UseSelectReturn {
  const [list, setList] = useState<CheckableType[]>(generateCheckableList(initialList));
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("recent");
  
  const searchedList = useMemo(() => {
    if (search.trim() === "") {
      if (sort === "nameAsc") return list.sort((a: any, b: any) => a.name < b.name ? -1 : 1);
      else if (sort === "nameDesc") return list.sort((a: any, b: any) => a.name > b.name ? -1 : 1);  
    }
    if (sort === "nameAsc") return list.filter((item: CheckableType) => item.name.indexOf(search) !== -1).sort((a: any, b: any) => a.name < b.name ? -1 : 1);
    else if (sort === "nameDesc") return list.filter((item: CheckableType) => item.name.indexOf(search) !== -1).sort((a: any, b: any) => a.name > b.name ? -1 : 1);
    return list.filter((item: CheckableType) => item.name.indexOf(search) !== -1);
  }, [list, search, sort]);

  const checkedList = useMemo(() => {
    return list.filter((item: CheckableType) => item.checked);
  }, [list]);

  // const hasEqual = useMemo(() => {
  //   return list.filter((item: Checkable) => item.name.trim() === search).length > 0;
  // }, [list, search]);

  const setCheckedByItem = useCallback((item: CheckableMember | CheckableGroup) => {
    setList((prevList: CheckableType[]) => {
      return prevList.map(data => {
        if (item.name === data.name) return { ...data, checked: !data.checked };
        return data;
      })
    });
  }, [list, setList]);

  const updateList = useCallback<any>((nextList: CheckableType[]) => {
    setList((prevList: CheckableType[]) => {
      return unionBy(prevList, nextList, "name").map((item) => {
        if (typeof item.checked === "undefined") return { ...item, checked: false };
        return item;
      });
    });
  }, [setList]);

  return [
    {
      searchedList,
      checkedList,
      // hasEqual
    },
    {
      setCheckedByItem,
      setSearch,
      setSort,
      updateList,
    }
  ];
};

export default useCheckableList;
