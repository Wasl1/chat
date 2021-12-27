import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { UserEntity } from './entity/user.entity';
import { UserHelperService } from './services/user-helper.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
    controllers: [UserController],
    providers: [UserService, UserHelperService],
    exports: [UserService]
})
export class UserModule {}
