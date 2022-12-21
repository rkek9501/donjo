import create from "zustand";
import moment from "moment";
moment.locale("ko");

export type BottomSheetType = "member" | "group" | "ruler" | "graph" | null;
export type BottomSheetCallback = (data: any) => void;

type BottomSheetStates = {
  open: boolean;
  type: BottomSheetType;
  callback?: BottomSheetCallback;
  height?: number;  // -1 ~ 10
  data?: any;
}

type BottomSheetActions = {
  onOpen: (type :BottomSheetType, callback?: BottomSheetCallback, height?: number, data?: any) => void;
  onClose: () => void;
  callback: (data: any) => void;
  setHeight: (height: number) => void;
  onBackPressBS: () => boolean; 
}

export type BottomSheetStoreTypes = BottomSheetStates & BottomSheetActions;

const initialState: BottomSheetStates = {
  open: false,
  type: null,
  height: -1,
  data: null,
}

const useBSStore = create((set, get: () => any) => ({
  ...initialState,
  onOpen: (type: BottomSheetType, callback?: BottomSheetCallback, height?: number, data?: any) => {
    console.log("!!!", { open: true, type, callback, height })
    return set({ open: true, type, callback, height, data })
  },
  onClose: () => set(initialState),
  onBackPressBS: () => {
    const { open } = get();
    if (open) set(initialState);
    return open;
  },
  setHeight: (height: string) => set({ height }),
}));

export default useBSStore;
