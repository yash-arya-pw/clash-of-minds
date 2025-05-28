import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { Resource, ResourceSchema } from './schemas/resource.schema';
import { UserResourceMapping, UserResourceMappingSchema } from './schemas/user-resource-mapping.schema';
import { Image, ImageSchema } from './schemas/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resource.name, schema: ResourceSchema },
      { name: UserResourceMapping.name, schema: UserResourceMappingSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [MongooseModule, ResourcesService],
})
export class ResourcesModule {} 