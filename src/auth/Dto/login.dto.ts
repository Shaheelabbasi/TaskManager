import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,IsNotEmpty } from "class-validator";

export class LoginDto{
@ApiProperty({example:"example@gmail.com"})
@IsEmail()
@IsNotEmpty()
email:string

@ApiProperty({example:"1234"})
@IsNotEmpty()
password:string

}