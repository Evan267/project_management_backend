import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/public.decorator';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {}
