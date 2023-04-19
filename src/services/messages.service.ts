import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { transformedMessage } from 'src/types/message.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { Repository } from 'typeorm';
import { CreateReactionDto } from 'src/dto/create-reaction.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}
  create(createMessage: transformedMessage) {
    return this.messageRepository.save(createMessage);
  }

  findAll(userId?: number) {
    return this.messageRepository.find({
      where: { user: { id: userId } },
      loadRelationIds: true,
    });
  }

  async findOne(id: number) {
    console.log(id);
    const message = await this.messageRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async remove(userId: number, id: number) {
    const message = await this.messageRepository.findOne({
      where: { id, user: { id: userId } },
      loadRelationIds: true,
    });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    const removeMessage = await this.messageRepository.remove(message);
    if (!removeMessage) {
      throw new BadRequestException();
    }
    return { delete: true, status: 'OK' };
  }

  async addReaction(id: number, createReactionDto: CreateReactionDto) {
    const message = await this.messageRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    if (message.user === createReactionDto.author) {
      throw new ForbiddenException();
    }
    const reactions = [...message.reactions];
    reactions.push({
      ...createReactionDto,
    });
    await this.messageRepository.update(id, { reactions });
    return this.messageRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  async addComment(id: number, createCommentDto: CreateCommentDto) {
    const message = await this.messageRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    if (message.user === createCommentDto.author) {
      throw new ForbiddenException();
    }
    const comments = [...message.comments];
    comments.push({
      ...createCommentDto,
    });
    await this.messageRepository.update(id, { comments });
    return this.messageRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }
}
