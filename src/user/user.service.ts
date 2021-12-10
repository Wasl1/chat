import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { v1 as uuid } from 'uuid';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    users: User[] = [];
    constructor () {}

    getAllUsers(): User[] {
        return this.users;
    }

    createUser(payload: createUserDto): User {
        const { firstName, lastName, userName, email, password } = payload;
        const user = {
            id: uuid(),
            firstName,
            userName,
            lastName,
            email,
            password
        }
        this.users.push(user);
        return user;
    }

    getUserById(userId: string): User {
        const user = this.users.find(u => u.id === userId);
        return user;
    }

    deleteUser(userId: string): void {
        this.users = this.users.filter(u => u.id !== userId);
    }
}
