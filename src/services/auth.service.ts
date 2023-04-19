import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  payload,
  signinResponse,
  signupResponse,
  tokenDecoded,
} from 'src/types/auth.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(
    createUserDto: CreateUserDto,
  ): Promise<signupResponse | HttpException> {
    const { password, ...user } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const {
        password: savedPassword,
        createdAt,
        ...savedUser
      } = await this.userRepository.save({
        password: hashedPassword,
        ...user,
      });

      return savedUser;
    } catch (e) {
      if (e.code === '23505') {
        throw new HttpException('User already exist', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(pass, user.password);
    if (valid) {
      return user;
    }
    return null;
  }

  signin(user: User): signinResponse {
    const payload: payload = { userId: user.id, username: user.username };
    return {
      access_toke: this.jwtService.sign(payload),
      expires_in: process.env.JWT_EXPIRES_IN,
      message: 'Successfully logged in',
      status: true,
    };
  }

  async getMe(user: tokenDecoded) {
    const { password, ...userInfo } = await this.userRepository.findOne({
      where: { id: user.userId },
      relations: { messages: true },
    });
    return userInfo;
  }
}
