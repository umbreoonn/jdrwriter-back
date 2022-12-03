import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class DreamDto {
  id: number;

  @MinLength(1)
  @MaxLength(50)
  @IsString()
  @IsDefined()
  title: string;

  @MinLength(1)
  @IsString()
  @IsDefined()
  content: string;

  userId: number;
}
