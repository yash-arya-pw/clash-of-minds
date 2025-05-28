import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserTroopMappingDocument = UserTroopMapping & Document;

@Schema({ timestamps: true, collection: 'user-troop-mapping' })
export class UserTroopMapping {
  @Prop({ type: Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  troopId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  quantity: number;
}

export const UserTroopMappingSchema = SchemaFactory.createForClass(UserTroopMapping); 