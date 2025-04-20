export class JwtPayloadDto {
  sub: number;

  email: string;

  username: string;

  iat?: number;

  exp?: number;

  constructor(sub: number, email: string, username: string) {
    this.sub = sub;
    this.email = email;
    this.username = username;
  }
}