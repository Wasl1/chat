import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ChannelEntity } from "./channel.entity";

@Entity()
export class MessageEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => UserEntity, user => user.messages)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => ChannelEntity, channel => channel.messages)
  @JoinTable()
  channel: ChannelEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
}