import create from 'zustand';
import moment from "moment";
moment.locale("ko");

import { Member } from '../db/entities';

export const DATE_FORMAT = "YYYY.MM.DD"

type Steps = number;
type StoreStates = {
  name: string;
  price: number;
  place: string;
  date: moment.Moment;
  members: Member[];
  bottomSheetRef: any;
  step: Steps;
}

type StoreActions = {
  setName: (name: string) => void;
  setPrice: (price: number) => void;
  setPlace: (place: string) => void;
  setDate: (date: moment.Moment) => void;
  addMember: (member: Member) => void;
  removeMember: (member: Member) => void;
  setStep: (step: Steps) => void;
}

export type StoreTypes = StoreStates & StoreActions;

const initialState: StoreStates = {
  name: "",
  price: 0,
  place: "",
  date: moment(),
  members: [],
  bottomSheetRef: null,
  step: 0,
}

const useCalcStore = create((set, get) => ({
  ...initialState,
  setStep: (step) => set(() => ({ step })),
  loadTempData: (data) => set(() => ({ ...data })),
  setName: (name) => set(() => ({ name })),
  setPrice: (price) => set(() => ({ price })),
  setPlace: (place) => set(() => ({ place })),
  setDate: (date) => set(() => ({ date: moment(date) })),
  addMember: (member) => set((state: StoreStates) => {
    const members = state.members;
    members.push(member);
    return { members }
  }),
  removeMember: (member) => set((state: StoreStates) => {
    const idx = state.members.findIndex(member);
    const members = state.members.splice(idx, 1);
    return { members }
  }),
}));

export default useCalcStore;
