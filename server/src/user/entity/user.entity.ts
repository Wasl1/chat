import { ChannelEntity } from 'src/chat/entity/channel.entity';
import { ConnectedUserEntity } from 'src/chat/entity/connected-user.entity';
import { JoinedChannelEntity } from 'src/chat/entity/joined-channel.entity';
import { MessageEntity } from 'src/chat/entity/message.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, BeforeInsert, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @ManyToMany(() => ChannelEntity, channel => channel.users)
  channels: ChannelEntity[]

  @OneToMany(() => ConnectedUserEntity, connection => connection.user)
  connections: ConnectedUserEntity[];

  @OneToMany(() => JoinedChannelEntity, joinedChannel => joinedChannel.channel)
  joinedChannels: JoinedChannelEntity[];

  @OneToMany(() => MessageEntity, message => message.user)
  messages: MessageEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
  }

}