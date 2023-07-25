import { IsString } from 'class-validator';

export class TagInput {
  @IsString()
  id: string;
}
