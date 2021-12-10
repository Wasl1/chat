import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { createUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    users: User[] = [];
    constructor (@InjectRepository(User)
    private usersRepository: Repository<User>) {}

    async getAllUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUserById(userId: string): Promise<User> {
        return await this.usersRepository.findOne(userId);
    }

    async createUser(payload: createUserDto): Promise<User> {
        return await this.usersRepository.save(payload);
    }

    async deleteUser(userId: string): Promise<void> {
        await this.usersRepository.delete(userId);
    }
}
