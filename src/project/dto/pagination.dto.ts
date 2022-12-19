import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  take: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  page: number;
}
