import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import LoginDto from './login.dto';
import SignupDto from './signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return this._authService.signup(data);
  }

  @Public()
  @Post('login')
  async login(@Body() data: LoginDto) {
    return this._authService.login(data);
  }

  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
