import create from "zustand";
import moment from "moment";
moment.locale("ko");

export type BottomSheetType = "member" | "group" | "ruler" | "graph" | null;
export type BottomSheetCallback = (data: any) => void;

export type BottomSheetStates = {
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

export const initialBSState: BottomSheetStates = {
  open: false,
  type: null,
  height: -1,
  data: null,
  callback: undefined,
}

const useBSStore = create((set, get: () => any) => ({
  ...initialBSState,
  onOpen: (type: BottomSheetType, callback?: BottomSheetCallback, height?: number, data?: any) => {
    return set({ open: true, type, callback, height, data })
  },
  onClose: () => set(initialBSState),
  onBackPressBS: () => {
    const { open } = get();
    if (open) set(initialBSState);
    return open;
  },
  setHeight: (height: string) => set({ height }),
}));

export const useInnerBSStore = create((set, get: () => any) => ({
  ...initialBSState,
  onOpen: (type: BottomSheetType, callback?: BottomSheetCallback, height?: number, data?: any) => {
    return set({ open: true, type, callback, height, data })
  },
  onClose: () => set(initialBSState),
  onBackPressBS: () => {
    const { open } = get();
    if (open) set(initialBSState);
    return open;
  },
  setHeight: (height: string) => set({ height }),
}));

export default useBSStore;
