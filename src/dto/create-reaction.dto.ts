import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateReactionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reaction: string;
  @ApiProperty({ type: 'number' })
  @IsNumber()
  author: User;
}
