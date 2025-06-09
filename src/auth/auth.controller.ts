import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { authPayloadDTO } from './dto/auth.dto';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() authPayloadDTO: authPayloadDTO) {
    const response = this.authService.validateUser(authPayloadDTO);
    if (!response) throw new HttpException('Invalid credentials', 401);
    return response;
  }

  @Get('status')
  @UseGuards(JwtGuard)
  status() {}
}
