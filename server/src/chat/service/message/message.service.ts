import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { MessageEntity } from 'src/chat/entity/message.entity';
import { ChannelI } from 'src/chat/interface/channel.interface';
import { MessageI } from 'src/chat/interface/message.interface';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>
      ) { }
    
      async create(message: MessageI): Promise<MessageI> {
        return this.messageRepository.save(this.messageRepository.create(message));
      }
    
      async findMessagesForChannel(channel: ChannelI, options: IPaginationOptions): Promise<Pagination<MessageI>> {
        const query = this.messageRepository
          .createQueryBuilder('message')
          .leftJoin('message.channel', 'channel')
          .where('channel.id = :channelId', { channelId: channel.id })
          .leftJoinAndSelect('message.user', 'user')
          .orderBy('message.created_at', 'DESC');
    
        return paginate(query, options);
    
      }
}
