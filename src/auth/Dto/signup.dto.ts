
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
ApiProperty
export class SignupDto {

    @ApiProperty({example:"john doe"})
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty({example:"abc@gmail.com"})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({example:"1234"})
    @IsString()
    @IsNotEmpty()
    password: string

}