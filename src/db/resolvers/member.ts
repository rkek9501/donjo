import type { Repository } from 'typeorm';
import { MemberInput } from 'DB/types/inputs';
import AppDataSource, { Member } from '../entities';

export default class MemberResolver {
  private memberRepository: Repository<Member>;
  constructor() {
    this.memberRepository = AppDataSource.getRepository(Member);
  }

  init() {
    this.memberRepository = AppDataSource.getRepository(Member);
  }

  async getMembers() {
    return await this.memberRepository.find({
      relations: ["groups"]
    });
  }

  async findMember(name: string) {
    return await this.memberRepository.findOne({ where: { name }});
  }

  async createMember(member: MemberInput) {
    const findMember = await this.memberRepository.findOne({ where: { name: member.name }});
    if (findMember) {
      throw new Error("이미 존재하는 멤버 입니다.");
    }
    
    const memberObj = new Member();
    if (member.name) memberObj.name = member.name;
    if (member.bank) memberObj.bank = member.bank;
    if (member.account) memberObj.account = member.account;
    if (member.groups) memberObj.groups = member.groups;
    
    const createdMember = await this.memberRepository.create(memberObj);
    await this.memberRepository.save(createdMember);

    return createdMember;
  }

  async updateMember(id: number, member: MemberInput) {
    const updateMember = await this.memberRepository.findOne({ where: { id }});
    if (!updateMember) {
      throw new Error("존재하지 않는 멤버 입니다.");
    }

    if (member.name) updateMember.name = member.name;
    if (member.bank) updateMember.bank = member.bank;
    if (member.account) updateMember.account = member.account;
    if (member.groups) updateMember.groups = [];
    await this.memberRepository.save(updateMember);

    if (member.groups) updateMember.groups = member.groups;
    return await this.memberRepository.save(updateMember)
  }

  async unlinkMemberOfGroup(member_id: number, group_id: number) {
    return await this.memberRepository
      .createQueryBuilder()
      .delete()
      .from("member_group")
      .where("member_id = :member_id and group_id = :group_id", { member_id, group_id })
      .execute();
  }

  async deleteMember(id: number) {
    const deleteMember = await this.memberRepository.findOne({ where: { id }});
    if (deleteMember) {
      await this.memberRepository.remove(deleteMember);
    }
    return true;
  }
}
