import { IsString } from 'class-validator';

export class PictureInput {
  @IsString()
  url: string;
}
