import { ManyToMany } from 'typeorm';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinTable
} from 'typeorm/browser';
import { Member } from './member';

@Entity("Dutch")
export class Dutch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: false })
  isPayer: boolean;

  // isPayer === true 일 때 (결재자)
  @Column({ nullable: false })
  payPrice: number;

  // 지불할 금액
  @Column({ nullable: false, default: 0 })
  ownPrice: number;

  @Column({ nullable: false })
  payId: number;

  @ManyToMany((type: any) => Member, (member) => member.id)
  @JoinTable()
  member: Member;
}
