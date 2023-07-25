import { IsString } from 'class-validator';

export class UpdatePictureInput {
  @IsString()
  id: string;

  @IsString()
  url: string;
}
