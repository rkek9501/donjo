import { useCallback, useEffect, useMemo, useState } from "react";

const useList = (initialState: any[]) => {
  const [list, setList] = useState(initialState || []);

  const addItem = useCallback((item: any) => {
    const newList = [ ...list ];
    newList.push(item);
    setList(newList);
  }, [list]);

  const changeItem = useCallback((index: number, item: any) => {
    const newList = [ ...list ];
    newList[index] = item;
    setList(newList);
  }, [list]);

  const removeItem = useCallback((index: number) => {
    const newList = [ ...list ];
    newList.splice(index, 1);
    setList(newList);
  }, [list]);

  const cachedist = useMemo(() => list, [list]);

  return {
    list: cachedist,
    addItem,
    changeItem,
    removeItem,
  };
};

export default useList;
