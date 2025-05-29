import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourcesModule } from './resources/resources.module';
import { TroopsModule } from './troops/troops.module';
import { AttackModule } from './attack/attack.module';
import { BattleModule } from './battle/battle.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Quiz } from './quiz/schemas/quiz.schema';
import { QuizModule } from './quiz/quiz.module';

//app module
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ResourcesModule,
    TroopsModule,
    AttackModule,
    BattleModule,
    AuthModule,
    UserModule,
    QuizModule,
  ],
})
export class AppModule {}
