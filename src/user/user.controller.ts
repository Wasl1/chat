import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAllUSers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get('/:id')
    getUserById(@Param('id') userId: string): Promise<User> {
        return this.userService.getUserById(userId);
    }

    @Post()
    async createUser(@Body() payload: createUserDto) {
        const user = await this.userService.createUser(payload);
        return {
            message: "User created",
            value: [user]
          }
    }

    @Delete('/:id')
    deleteUser(@Param('id') userId: string): void {
        this.userService.deleteUser(userId);
    }
}
