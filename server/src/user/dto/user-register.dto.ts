import { IsNotEmpty, IsString } from 'class-validator';
import { UserLoginDTO } from './user-login.dto';

export class UserRegisterDTO extends UserLoginDTO{
    @IsNotEmpty()
    @IsString()
    username: string;
}
