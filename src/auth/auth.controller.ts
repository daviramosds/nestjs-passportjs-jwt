import {
  Body,
  ConsoleLogger,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { authPayloadDTO } from './dto/auth.dto';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';

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
