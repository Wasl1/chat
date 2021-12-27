import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JoinedChannelEntity } from "./joined-channel.entity";
import { MessageEntity } from "./message.entity";

@Entity()
export class ChannelEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => UserEntity)
    @JoinTable()
    users: UserEntity[];

    @OneToMany(() => JoinedChannelEntity, joinedChannel => joinedChannel.channel)
    joinedUsers: JoinedChannelEntity[];

    @OneToMany(() => MessageEntity, message => message.channel)
    messages: MessageEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}