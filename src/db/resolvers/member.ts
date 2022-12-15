import { getRepository } from 'typeorm';
import { Member } from '../entities';

export default class MemberResolver {
  private memberRepository = getRepository(Member);
  constructor() {
    
  }
  async getMembers() {
    return await this.memberRepository.find({
      relations: ["groups"]
    });
  }

  async findMember(name: string) {
    return await this.memberRepository.findOne({ where: { name }});
  }

  async createMember(member: Member) {
    const findMember = await this.memberRepository.findOne({ where: { name: member.name }});
    if (findMember) {
      throw new Error("이미 존재하는 멤버 입니다.");
    }

    const createdMember = this.memberRepository.create(member)
    await this.memberRepository.save(createdMember);
    return createdMember;
  }

  async updateMember(id: number, member: Member) {
    const updateMember = await this.memberRepository.findOne({ where: { id }});
    if (!updateMember) {
      throw new Error("존재하지 않는 멤버 입니다.");
    }

    if (member.name) updateMember.name = member.name;
    if (member.bank) updateMember.bank = member.bank;
    if (member.account) updateMember.account = member.account;

    return await this.memberRepository.save(updateMember)
  }

  async deleteMember(id: number) {
    const deleteMember = await this.memberRepository.findOne({ where: { id }});
    if (deleteMember) {
      await this.memberRepository.remove(deleteMember);
    }
    return true;
  }
}
