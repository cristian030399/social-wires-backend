import { User } from 'src/entities/user.entity';

export type comment = {
  comment: string;
  author: User;
};

export type reaction = {
  reaction: string;
  author: User;
};

export type transformedMessage = {
  user: User;
  title: string;
  text: string;
};
