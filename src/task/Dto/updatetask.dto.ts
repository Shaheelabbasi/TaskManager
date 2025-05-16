import { IsNotEmpty,IsString,IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateTaskDto{

  @IsNotEmpty()
  id:number  
 @ApiProperty({example:"tasktitle"}) 
@IsString()
title:string

@ApiProperty({example:"describe your task here"})
@IsOptional()
@IsString()

description:string
@ApiProperty({example:"completed"})
@IsOptional()
@IsString()
status:string


}