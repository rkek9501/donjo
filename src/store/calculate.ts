import create from "zustand";
import moment from "moment";
moment.locale("ko");

import { Member } from "../db/entities";

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
  payer: Member | null;
}

type StoreActions = {
  setName: (name: string) => void;
  setPrice: (price: number) => void;
  setPlace: (place: string) => void;
  setDate: (date: moment.Moment) => void;
  setPayer: (payer: Member) => void;
  addMember: (member: Member) => void;
  changeMember: (index: number, member: Member) => void;
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
  payer: null,
}

const useCalcStore = create((set, get) => ({
  ...initialState,
  setStep: (step: any) => set(() => ({ step })),
  loadTempData: (data: any) => set(() => ({ ...data })),
  setName: (name: string) => set(() => ({ name })),
  setPrice: (price: number) => set(() => ({ price })),
  setPlace: (place: string) => set(() => ({ place })),
  setDate: (date: moment.Moment) => set(() => ({ date: moment(date) })),
  setPayer: (payer: Member) =>  set(() => ({ payer })),
  addMember: (member: Member) => set((state: StoreStates) => {
    const members = state.members;
    members.push(member);
    return { members }
  }),
  changeMemeber: (index: number, member: Member) => set((state: StoreStates) => {
    const members = state.members;
    members[index] = member;
    return { members }
  }),
  removeMember: (member: Member) => set((state: StoreStates) => {
    const idx = state.members.findIndex((mem: Member) => JSON.stringify(member) === JSON.stringify(mem)) as number;
    const members = state.members.splice(idx, 1);
    return { members }
  }),
}));

export default useCalcStore;
