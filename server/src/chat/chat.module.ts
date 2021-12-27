import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ChannelEntity } from './entity/channel.entity';
import { ConnectedUserEntity } from './entity/connected-user.entity';
import { JoinedChannelEntity } from './entity/joined-channel.entity';
import { MessageEntity } from './entity/message.entity';
import { ChatGateway } from './gateway/chat.gateway';
import { ChannelService } from './service/channel-service/channel/channel.service';
import { ConnectedUserService } from './service/connected-user/connected-user.service';
import { JoinedChannelService } from './service/joined-channel/joined-channel.service';
import { MessageService } from './service/message/message.service';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forFeature([ChannelEntity, ConnectedUserEntity, MessageEntity, JoinedChannelEntity])],
  providers: [ChatGateway, ChannelService, ConnectedUserService, JoinedChannelService, MessageService]
})
export class ChatModule {}
