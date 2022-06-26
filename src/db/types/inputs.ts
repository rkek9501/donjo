import { Group, Member, Pay, Bill, Dutch } from '../entities';

export type BillInput = {
  date: Date;
  total: number;
}

export type PayInput = {
  place: string;
  date: Date;
  price: number;
  payer?: Member;
  groupId?: number;
}

export type MemberInput = {
  name: string;
  bank?: string;
  account?: string;
}
export type GroupInput = {
  name: string;
}

export default {};
