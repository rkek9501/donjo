import { Group, Member } from 'DB/entities';
import create, { StoreApi, UseBoundStore } from 'zustand';

export type RoutesData = {
  members?: Member[];
  groups?: Group[];
} | any | null;

type StackRoutes = "TabMemu" | "LoadMember" | "Main";

type Purpose = "calc" | "member" | "group";

export type RoutesStates = {
  // from?: StackRoutes;
  // to?: StackRoutes;
  purpose?: Purpose;
  callback?: (...args: any) => void;
  // data: RoutesData;
};

type RoutesActions = {
  setInit: () => void;
  setRequest: (state: RoutesStates) => void;
  // setData: (data: RoutesData) => void;
  // setPurpose: (type: Purpose) => void;
  // setTo: (to: StackRoutes) => void;
  // setFrom: (from: StackRoutes) => void;
};

export type RoutesStoreTypes = RoutesStates & RoutesActions;

const initialState: RoutesStates = {
  // from: undefined,
  // to: undefined,
  purpose: undefined,
  callback: undefined,
  // data: null,
}

const useRoutesStore: UseBoundStore<StoreApi<RoutesStoreTypes>> = create((set, get) => ({
  ...initialState,
  setInit: () => set(initialState),
  setRequest: (state: RoutesStates) => set({ ...state })
  // setData: (data: RoutesData) => set({ data }),
  // setPurpose: (purpose: Purpose) => set({ purpose })
  // setTo: (to: StackRoutes) => set({ to }),
  // setFrom: (from: StackRoutes) => set({ from }),
}));

export default useRoutesStore;
