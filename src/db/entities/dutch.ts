import { ManyToMany } from 'typeorm';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinTable
} from 'typeorm';
import { Member } from './member';

@Entity("Dutch")
export class Dutch {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false, default: false })
  isPayer!: boolean;

  // isPayer === true 일 때 (결재자)
  @Column({ nullable: false })
  payPrice!: number;

  // 지불할 금액
  @Column({ nullable: false, default: 0 })
  ownPrice!: number;

  @Column({ nullable: false })
  payId!: number;

  @ManyToMany(() => Member, (member) => member.id)
  @JoinTable()
  member?: Member;
}
