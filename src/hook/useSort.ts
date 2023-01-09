import { useState, useCallback, useMemo } from "react";

import { SortKey } from "Component/MemberFilter";

type List = any[];

export type SortReturns = (initialList: List, sortKey?: any) => [
  List,
  (data: List) => void
];

const useSort: SortReturns = (initialList: List, sortKey?: SortKey) => {
  const [list, setList] = useState<any[]>(initialList || []);

  const sorted = useMemo(() => {
    if (sortKey === "nameAsc") {
      return list?.sort((a: any, b: any) => a.name < b.name ? -1 : 1);
    } else if (sortKey === "nameDesc") {
      return list?.sort((a: any, b: any) => a.name > b.name ? -1 : 1);
    }
    return list || [];
  }, [list, sortKey]);

  const setData = useCallback((nextList: List) => {
    setList(nextList);
  }, [list]);

  return [
    sorted,
    setData,
  ];
};

export default useSort;;