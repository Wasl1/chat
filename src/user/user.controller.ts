import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAllUSers(): User[] {
        return this.userService.getAllUsers();
    }

    @Get('/:id')
    getUserById(@Param('id') userId: string): User {
        return this.userService.getUserById(userId);
    }

    @Post()
    createUser(@Body() payload: createUserDto) {
        return this.userService.createUser(payload);
    }

    @Delete('/:id')
    deleteUser(@Param('id') userId: string): void {
        this.userService.deleteUser(userId);
    }
}
