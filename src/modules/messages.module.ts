import { Module } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { MessagesController } from '../controllers/messages.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
