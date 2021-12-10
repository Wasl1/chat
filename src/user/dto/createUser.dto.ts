import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @IsString()
    @IsNotEmpty()
    userName: string;
    @IsString()
    @IsNotEmpty()
    lastName: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}