import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { emojiToUnicodeConverter } from 'src/helpers/emoji.helper';

@Injectable()
export class ReactionInterceptInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;
    body.reaction = emojiToUnicodeConverter(body.reaction);
    return next.handle();
  }
}
