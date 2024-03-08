import { Injectable } from '@nestjs/common';
import SignupDto from 'src/auth/signup.dto';
import { DatabaseService } from 'src/database/database.service';

export type User = any;// à Changer

@Injectable()
export class UsersService {
    constructor(private _databaseService: DatabaseService) {}

    async findOne(email: string): Promise<User | undefined> {
        const query = "SELECT id, email, password FROM users WHERE email=$1";
        return this._databaseService.executeQueryOneResult(query, [email]);
    }

    async createUser(signupData: SignupDto) {
        const query =  "INSERT INTO users (first_name, last_name, email, username, birth, password) VALUES ($1, $2, $3, $4, $5, $6)";
        return this._databaseService.executeQuery(query, [signupData.first_name, signupData.last_name, signupData.email, signupData.username, signupData.birth, signupData.password]);
    }
}
