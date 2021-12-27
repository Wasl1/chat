import { Body, Controller, Get, Post, Put, Query} from '@nestjs/common';
import { UserRegisterDTO } from 'src/user/dto/user-register.dto';
import { UserService } from './services/user.service';
import { UserHelperService } from './services/user-helper.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UserI } from './interfaces/user.interface';
import { UserLoginDTO } from './dto/user-login.dto';
import { LoginResponseI } from './interfaces/login-response.interface';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private userHelperService: UserHelperService) { }

    @Post()
    async create(@Body() userRegisterDto: UserRegisterDTO): Promise<UserI> {
        const userEntity: UserI = this.userHelperService.userRegisterDtoToEntity(userRegisterDto);
        return this.userService.userRegister(userEntity);
    }

    @Get()
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<Pagination<UserI>> {
        limit = limit > 100 ? 100 : limit;
        return this.userService.findAll({ page, limit, route: 'http://localhost:3000/users' });
    }

    @Get('/find-by-username')
    async findAllByUsername(@Query('username') username: string) {
        return this.userService.findAllByUsername(username);
    }

    @Post('login')
    async login(@Body() UserLoginDTO: UserLoginDTO): Promise<LoginResponseI> {
        const userEntity: UserI = this.userHelperService.userLoginDtoToEntity(UserLoginDTO);
        const jwt: string = await this.userService.login(userEntity);
        return {
            access_token: jwt,
            token_type: 'JWT',
            expires_in: 10000
        };
    }

    @Put()
    async editUser(@Query('userId') userId: number, @Body() userEdited) {
      const user = await this.userService.editUser(userId, userEdited);
      console.log(user);
      
      return user;
    }
}
