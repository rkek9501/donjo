import { getRepository, getConnection } from 'typeorm/browser';
import { In } from 'typeorm';
import { Group, Member, Pay, Bill, Dutch } from '../entities';
import { BillInput, GroupInput, MemberInput, PayInput } from '../types/inputs';

export default class ComplexResolver {
  private memberRepository = getRepository(Member);
  private groupRepository = getRepository(Group);
  private payRepository = getRepository(Pay);
  private billRepository = getRepository(Bill);
  private dutchRepository = getRepository(Dutch);
  constructor() {return this}

  async getPays() {
    const findPay = await this.payRepository.find({
      relations: [
        "group", "group.members"
      ]
    })
    console.log(JSON.stringify({ findPay }, null, 2));
    return findPay;
  }

  async create({
    billInput,
    payInput,
    groupInput,
    membersInput
  }: {
    billInput?: BillInput,
    payInput?: PayInput,
    groupInput?: GroupInput,
    membersInput: MemberInput[]
  }) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.upsert(Member, membersInput, ["name"]);

      const memberNames: string[] = membersInput.map(m => m.name);
      const groupMembers = await queryRunner.manager.find(Member, { where: { name: In(memberNames) }})

      let searchedGroup = await queryRunner.manager.findOne(Group, { where: { name: "테스트", members: groupMembers }});
      if (!searchedGroup) {
        const groupToCreate = await queryRunner.manager.create(Group, { id: undefined, name: "테스트" });
        await queryRunner.manager.save(Group, groupToCreate);

        const createdGroup = await queryRunner.manager.findOne(Group, { where: groupToCreate });
        createdGroup.members = groupMembers;
        await queryRunner.manager.save(Group, createdGroup);

        searchedGroup = createdGroup;
      }

      const createPay = queryRunner.manager.create(Pay, {
        ...payInput,
        group: searchedGroup
      });
      const createdPay = await queryRunner.manager.save(Pay, createPay);
      const result = await queryRunner.manager.findOne(Pay, {
        where: createdPay,
        relations: [
          "group", "group.members"
        ]
      });
      console.log(JSON.stringify({ result }, null, 2));

      await queryRunner.rollbackTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
