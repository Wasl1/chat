import { Injectable } from '@nestjs/common';
import { UserLoginDTO } from '../dto/user-login.dto';
import { UserRegisterDTO } from '../dto/user-register.dto';
import { UserI } from '../interfaces/user.interface';

@Injectable()
export class UserHelperService {
    userRegisterDtoToEntity(userRegister: UserRegisterDTO): UserI {
        return {
          email: userRegister.email,
          username: userRegister.username,
          password: userRegister.password
        };
      }
    
      userLoginDtoToEntity(UserLoginDTO: UserLoginDTO): UserI {
        return {
          email: UserLoginDTO.email,
          password: UserLoginDTO.password
        };
      }
}
