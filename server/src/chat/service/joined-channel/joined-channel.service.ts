import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinedChannelEntity } from 'src/chat/entity/joined-channel.entity';
import { ChannelI } from 'src/chat/interface/channel.interface';
import { JoinedChannelI } from 'src/chat/interface/joined-channel.interface';
import { UserI } from 'src/user/interfaces/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class JoinedChannelService {
    constructor(
        @InjectRepository(JoinedChannelEntity)
        private readonly joinedChannelepository: Repository<JoinedChannelEntity>
      ) { }
    
      async create(joinedChannel: JoinedChannelI): Promise<JoinedChannelI> { 
        return this.joinedChannelepository.save(joinedChannel);
      }
    
      async findByUser(user: UserI): Promise<JoinedChannelI[]> {
        return this.joinedChannelepository.find({ user });
      }
    
      async findByChannel(channel: ChannelI): Promise<JoinedChannelI[]> {
        return this.joinedChannelepository.find({ channel });
      }
    
      async deleteBySocketId(socketId: string) {
        return this.joinedChannelepository.delete({ socketId });
      }
    
      async deleteAll() {
        await this.joinedChannelepository
          .createQueryBuilder()
          .delete()
          .execute();
      }
    
}
