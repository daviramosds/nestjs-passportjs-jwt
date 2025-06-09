import { Injectable } from '@nestjs/common';
import { authPayloadDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    username: 'davirds',
    password: '123',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtSevice: JwtService) {}

  validateUser({ username, password }: authPayloadDTO) {
    const user = fakeUsers.find((user) => user.username == username);
    if (!user || user.password != password) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return this.jwtSevice.sign(userWithoutPassword);
  }
}
