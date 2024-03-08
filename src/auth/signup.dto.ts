import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    birth: Date;

    @IsString()
    @IsNotEmpty()
    password: string;
}
export default SignupDto;