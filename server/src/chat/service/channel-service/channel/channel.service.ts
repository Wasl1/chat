import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ChannelEntity } from 'src/chat/entity/channel.entity';
import { ChannelI } from 'src/chat/interface/channel.interface';
import { UserI } from 'src/user/interfaces/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {

    constructor(@InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>) { }

    async createChannel(channel: ChannelI, creator: UserI): Promise<ChannelI> {
        const newChannel = await this.addCreatorToChannel(channel, creator);
        return await this.channelRepository.save(newChannel);
    }

    async getChannel(channelId: number): Promise<ChannelI> {
        return this.channelRepository.findOne(channelId, {
            relations: ['users']
        });
    }
    async getChannelsForUser(userId: number, options: IPaginationOptions): Promise<Pagination<ChannelI>> {
        const query = this.channelRepository
            .createQueryBuilder('channel')
            .leftJoin('channel.users', 'users')
            .where('users.id = :userId', { userId })
            .leftJoinAndSelect('channel.users', 'all_users')
            .orderBy('channel.updated_at', 'DESC');

        return paginate(query, options);
    }

    async addCreatorToChannel(channel: ChannelI, creator: UserI): Promise<ChannelI> {
        channel.users.push(creator);
        return channel;
    }
}
