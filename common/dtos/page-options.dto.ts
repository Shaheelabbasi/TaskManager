import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsOptional, Min, } from "class-validator"

export class PageOptionsDto{
     @IsOptional()
     @IsInt()
     @Type(()=>Number)
     readonly page :number=1

    @IsOptional()
    @IsInt()
   // @Type(()=>Number)
    //no of results per page defaults to the set value 
    readonly take:number=3
    

   
}