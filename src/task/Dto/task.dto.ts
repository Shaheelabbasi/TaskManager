import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TaskDto{
 @ApiProperty({example:"mytask"})   
@IsNotEmpty()
title:string

@ApiProperty({example:"this task is aout to be xyz"})  
@IsNotEmpty()
description:string


}