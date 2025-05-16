import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from '@nestjs/core';
@Injectable()

export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
       // private reflector:Reflector
    ) {

    }
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        try {
            const decoded = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            request.user = decoded; 

        // const roles=this.reflector.get<string[]>('roles',context.getHandler())

        // if(roles.includes(request.user.role))
            return true;  
        //else return false
        
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }


}


