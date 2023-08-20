// src/spot/schemas/spot.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Spot' })
export class Spot extends Document {
  // @Prop({
  //   type: {
  //     type: String,
  //     enum: ['Point'], // Le type doit être "Point" pour une géolocalisation
  //   },
  //   coordinates: [Number], // [longitude, latitude]
  // })
  // location: {
  //   type: string;
  //   coordinates: [number, number];
  // };

  @Prop({ required: true })
  name: string;
}

export const SpotSchema = SchemaFactory.createForClass(Spot);
// SpotSchema.index({ location: '2dsphere' });
