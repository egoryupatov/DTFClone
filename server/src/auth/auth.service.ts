import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  ///

  async validateUser(
    login: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findByLogin(login);

    if (user && user.password === pass) {
      const { password, ...securedUser } = user;
      return securedUser;
    }
    return null;
  }

  ///

  async login(user: User) {
    const payload = { username: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
    };
  }
}
