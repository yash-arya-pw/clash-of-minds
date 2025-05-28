import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TroopsService } from './troops.service';
import { TroopsController } from './troops.controller';
import { Troop, TroopSchema } from './schemas/troop.schema';
import { UserTroopMapping, UserTroopMappingSchema } from './schemas/user-troop-mapping.schema';
import { Image, ImageSchema } from '../resources/schemas/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Troop.name, schema: TroopSchema },
      { name: UserTroopMapping.name, schema: UserTroopMappingSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
  ],
  controllers: [TroopsController],
  providers: [TroopsService],
  exports: [MongooseModule, TroopsService],
})
export class TroopsModule {} 