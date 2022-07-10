import create from 'zustand';
import moment from "moment";
moment.locale("ko");

export type BottomSheetType = "member" | "ruler" | "graph" | null;
export type BottomSheetCallback = (data: any) => void;

type BottomSheetStates = {
  open: boolean;
  type: BottomSheetType;
  callback?: BottomSheetCallback;
}

type BottomSheetActions = {
  onOpen: (type :BottomSheetType, callback?: BottomSheetCallback) => void;
  onClose: () => void;
}


export type BottomSheetStoreTypes = BottomSheetStates & BottomSheetActions;

const initialState: BottomSheetStates = {
  open: false,
  type: null,
  callback: (data: any) => {}
}

const useBSStore = create((set, get) => ({
  ...initialState,
  onOpen: (type: BottomSheetType, callback?: BottomSheetCallback) => set({ open: true, type, callback }),
  onClose: () => set(initialState),
}));

export default useBSStore;
