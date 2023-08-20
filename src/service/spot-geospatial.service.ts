import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Spot } from 'src/schema/spot.shema';
import { GeoPointInput } from 'src/dto/input/geo-point/geo-point-input';
import { ObjectId } from 'mongodb';

@Injectable()
export class SpotGeospatialService {
  constructor(@InjectModel('Spot') private spotModel: mongoose.Model<Spot>) {}

  async searchArround(point: GeoPointInput): Promise<{ _id: ObjectId }[]> {
    const { coordinates, maxDistance } = point;
    return this.spotModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates,
          },
          $maxDistance: maxDistance,
        },
      },
    });
  }
}
