import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;
  @ApiProperty({ type: 'number' })
  @IsNumber()
  author: User;
}
