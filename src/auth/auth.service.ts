import { Injectable, BadRequestException} from '@nestjs/common';
import { SignupDto } from './Dto/signup.dto';
import { User } from '../auth/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'
import {LoginDto} from './Dto/login.dto'
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
         @InjectRepository(User)
        private readonly userRepository:Repository<User>,
        private jwtService:JwtService
    ){}

    async SignUp(userdto:SignupDto):Promise<User>{
   
        const {fullname,email,password}=userdto
    const IsexistingUser=await this.userRepository.findOne({where:{email:userdto.email}})
    
    if(IsexistingUser)
        throw new BadRequestException("user already exists") 

    const hashed=await bcrypt.hash(password,10)
        const user=this.userRepository.create({fullname,email,password:hashed})

        return await this.userRepository.save(user)
       // we will write the signup logic here
    }
    async Login(logindto:LoginDto){

        const {email,password}=logindto
        console.log("emial is ",email)
        console.log("password is ",password)

        const IsExisting=await this.userRepository.findOne({where:{email:email}})
       
        if (!IsExisting) {
            throw new BadRequestException("user does not exist")
        }
        

          if ( !bcrypt.compare(password,IsExisting.password) )
        {
        
            throw new BadRequestException("Incorrect password")
        }

        const token=this.jwtService.sign({id:IsExisting.id,email:IsExisting.email})

        return {
            message:"login successfull",
            token
        }

    }
}
