import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserInsertInterceptor } from 'src/interceptors/user-insert.interceptor';
import { CreateReactionDto } from 'src/dto/create-reaction.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(UserInsertInterceptor)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Request() { newData }, @Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(newData);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get('me')
  findMyMessages(@Request() { newData }) {
    return this.messagesService.findAll(newData.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Request() { newData }, @Param('id') id: string) {
    return this.messagesService.remove(newData.user, +id);
  }

  @Patch('reaction/:id')
  addReaction(
    @Param('id') id: string,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return this.messagesService.addReaction(+id, createReactionDto);
  }

  @Patch('comment/:id')
  addComment(
    @Param('id') id: string,
    @Body() createCommentDt: CreateCommentDto,
  ) {
    return this.messagesService.addComment(+id, createCommentDt);
  }
}
