import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import SignupDto from './signup.dto';
import * as bcrypt from 'bcrypt';
import LoginDto from './login.dto';

@Injectable()
export class AuthService {
    constructor(
        private _usersService: UsersService,
        private _jwtService: JwtService
    ) {}

    async signup(user: SignupDto) {
        const hashed_password = await bcrypt.hash(user.password, 10);
        try {
            await this._usersService.createUser({...user, password: hashed_password})
            const { password, ...result} = await this._usersService.findOne(user.email);
            return {
                access_token: this._jwtService.sign(result)
            };
        } catch (error) {
            if (error.severity  == "ERREUR" && error.constraint == "users_email_key") {
                throw new HttpException("L'adresse email est déjà utilisée", HttpStatus.UNAUTHORIZED);
            } else if (error.severity  == "ERREUR" && error.constraint == "users_username_key") {
                throw new HttpException("Le pseudo est déjà utilisée", HttpStatus.UNAUTHORIZED);
            }
            throw error;
        }
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this._usersService.findOne(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        if (!user) {
            throw new HttpException('Utilisateur introuvable', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('mot de passe incorrect', HttpStatus.BAD_REQUEST);
    }

    async login(user: LoginDto) {
        try {
            const payload = await this.validateUser(user.email, user.password);
            return {
                access_token: this._jwtService.sign(payload),
            };
        } catch (error) {
            throw error;
        }
    }
}
