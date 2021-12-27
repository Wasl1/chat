import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserLoginDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
