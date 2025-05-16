import { Controller ,Body,Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './Dto/signup.dto';
import { LoginDto } from './Dto/login.dto';
import { ApiResponse } from '@nestjs/swagger';

SignupDto
AuthService
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ){

    }

    @Post("signup")
   
Signup(@Body() userdto:SignupDto):any{

    return this.authService.SignUp(userdto)

}
@Post("login")

Login (@Body() logindto:LoginDto){

    return this.authService.Login(logindto)
}



}
