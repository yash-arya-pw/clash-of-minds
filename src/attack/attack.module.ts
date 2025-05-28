import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttackService } from './attack.service';
import { AttackController } from './attack.controller';
import { User, UserSchema } from '../user/user.schema';
import { ResourcesModule } from '../resources/resources.module';
import { TroopsModule } from '../troops/troops.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ResourcesModule,
    TroopsModule,
  ],
  controllers: [AttackController],
  providers: [AttackService],
  exports: [AttackService],
})
export class AttackModule {} 