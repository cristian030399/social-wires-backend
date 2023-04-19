import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    usarname: string,
    password: string,
  ): Promise<User | UnauthorizedException> {
    const user = await this.authService.validateUser(usarname, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
