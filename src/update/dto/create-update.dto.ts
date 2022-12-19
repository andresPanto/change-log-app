import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUpdateDTO {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  project: string;
}
