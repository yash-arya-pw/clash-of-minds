import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserResourceMappingDocument = UserResourceMapping & Document;

@Schema({ timestamps: true, collection: 'user-resource-mapping' })
export class UserResourceMapping {
  @Prop({ type: Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  assetId: Types.ObjectId;

  @Prop({ type: [Number], required: true })
  index: number[];
}

export const UserResourceMappingSchema = SchemaFactory.createForClass(UserResourceMapping); 