import create from "zustand";
import type { Connection } from "typeorm/browser";

import AppDataSource from "DB/entities/index";
import { Member } from "DB/entities";
import { Group } from "DB/entities";
import MemberResolver from "DB/resolvers/member";
import GroupResolver from "DB/resolvers/group";
import { MemberInput, GroupInput } from "DB/types/inputs";

export type DBConnection = {
  isConnected: boolean;
  connection: Connection | null;
  members?: Member[];
  groups?: Group[];
};

type DBConnectionActions = {
  initConnection: () => void;
  setConnection: (c: Connection | null) => void;
  setMembers: (list: Member[]) => void;
  setGroups: (list: Group[]) => void;
  reload: () => void;
  createMember: (member: MemberInput) => void;
  updateMember: (id: number, member: MemberInput) => void;
  removeMemberOfGroup: (memberId: number, groupId: number) => void;
};

export type DBConnectionStoreTypes = DBConnection & DBConnectionActions;

const initialState: DBConnection = {
  isConnected: false,
  connection: null,
};
const memberResolver = new MemberResolver();
const groupResolver = new GroupResolver();

const loadMembers = async () => {
  const members = await memberResolver.getMembers();
  return members;
};
const loadGroups = async () => {
  const groups = await groupResolver.getGroups();
  return groups;
};

const useDBStore = create((set, get: () => any) => ({
  ...initialState,
  setConnection: (connection: DBConnection) => set({ connection, isConnected: !!connection }),
  initConnection: async () => {
    // TODO: splash에서 처리 필요
    new Promise((resolve, reject) => {
      setTimeout(async() => {
        try {
          const connection = AppDataSource;
          await memberResolver.init();
          await groupResolver.init();
          
          const members = await loadMembers();
          const groups = await loadGroups();

          set({ connection, isConnected: !!connection, members, groups })
          resolve({ connection, members, groups });
        } catch (error) {
          console.log(error);
          set({ connection: null, isConnected: false, members: [], groups: [] })
          reject({ connection: null, members: [], groups: [] });
        }
      }, 1000);
    });
    // console.log({ connection, members, groups })
    // return set({ connection, isConnected: !!connection, members, groups })
  },
  reload: async () => {
    const members = await loadMembers();
    const groups = await loadGroups();
    return set({ members, groups });
  },
  reloadMembers: async () => {
    const members = await loadMembers();
    return set({ members });
  },
  reloadGroups: async () => {
    const groups = await loadGroups();
    return set({ groups });
  },
  createMember: async (member: MemberInput) => {
    const created = await memberResolver.createMember({
      name: member.name,
      bank: member.bank || undefined,
      account: member.account || undefined,
      groups: member.groups || [],
    });
    console.log({ created });
    const { reload } = get();;
    reload();
  },
  updateMember: async (memberId: number, member: MemberInput) => {
    const updated = await memberResolver.updateMember(memberId, {
      name: member.name,
      bank: member.bank || undefined,
      account: member.account || undefined,
      groups: member.groups || [],
    });
    console.log({ updated })
    const { reload } = get();
    reload();
  },
  createGroup: async (groupName: string) => {
    const created = await groupResolver.createGroup({ name: groupName, members: [] });
    console.log({ groupName, created });
    const { reloadGroups } = get();
    reloadGroups();
    return created;
  },
  updateGroup: async (groupId: number, group: GroupInput) => {
    const updated = await groupResolver.updateGroup(groupId, { name: group.name });
    const { reload } = get();
    reload();
    return updated;
  },
  removeMemberOfGroup: async (memberId: number, groupId: number) => {
    const remove = await memberResolver.unlinkMemberOfGroup(memberId, groupId);
    // console.log({remove});
    const { reload } = get();;
    reload();
  },
}));

export default useDBStore;
