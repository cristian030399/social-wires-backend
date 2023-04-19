export type signupResponse = {
  id: number;
  username: string;
  email: string;
  fullname: string;
};

export type signinResponse = {
  access_toke: string;
  expires_in: string;
  message: string;
  status: boolean;
};

export type payload = {
  userId: number;
  username: string;
};

export type tokenDecoded = {
  userId: number;
  username: string;
};
