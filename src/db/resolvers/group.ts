import { getRepository, getConnection } from 'typeorm/browser';
import { Group, Member, Pay, Bill, Dutch } from '../entities';

export default class GroupResolver {
  private groupRepository = getRepository(Group);
  constructor() {
    
  }
  async getGroups() {
    return await this.groupRepository.find({
      relations: [
        "members"
      ]
    });
  }

  async findGroup(name: string) {
    return await this.groupRepository.findOne({
      where: { name },
      relations: [
        "members"
      ]
    });
  }

  async createGroup(group: Group) {
    const findGroup = await this.groupRepository.findOne({ where: { name: group.name }});
    if (findGroup) {
      throw new Error("이미 존재하는 그룹 입니다.");
    }

    const createdGroup = this.groupRepository.create(group)
    await this.groupRepository.save(createdGroup);
    return createdGroup;
  }

  async updateGroup(id: number, group: Group) {
    const updateGroup = await this.groupRepository.findOne({ where: { id }});
    if (!updateGroup) {
      throw new Error("존재하지 않는 그룹 입니다.");
    }

    if (group.name) updateGroup.name = group.name;
    if (group.members) updateGroup.members = group.members;

    return await this.groupRepository.save(updateGroup)
  }

  async deleteGroup(id) {
    const deleteGroup = await this.groupRepository.findOne({ where: { id }});
    if (deleteGroup) {
      await this.groupRepository.remove(deleteGroup);
    }
    return true;
  }
}
