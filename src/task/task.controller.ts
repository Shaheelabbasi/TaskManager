import { Controller ,Post,UseGuards,Body, Get,Param,Patch, Delete,ValidationPipe, Query, UsePipes} from '@nestjs/common';
import { Task } from './task.entity';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/Guard/auth.guard';
import { TaskDto } from './Dto/task.dto';
import { CurrentUser } from 'src/auth/Decorator/current-user.decorator';
import { UpdateTaskDto } from './Dto/updatetask.dto';
import { PageOptionsDto } from 'common/dtos/page-options.dto';
import { SearchTaskDto } from './Dto/searchtask.dto';
@Controller('task')
export class TaskController {

    constructor(
 private readonly taskService:TaskService
    ){

    }
     @UseGuards(AuthGuard)
    @Post("create")
    Create(@Body() taskdto:TaskDto,@CurrentUser () user:any)
    {
    return this.taskService.Create(taskdto,user)
    }
    @UseGuards(AuthGuard)
    @Get("all")
    getAllTasks(@Query() pageOptionsDto:PageOptionsDto,@CurrentUser () user:any):Promise<Task[]>{
      return this.taskService.getAllTasks(pageOptionsDto,user)
    } 
    @UseGuards(AuthGuard)

    @Get(":id")
    getTask(@Param("id") id:number,@CurrentUser() user:any)
    {
   return this.taskService.getTask(Number(id),user)
    }


    @UseGuards(AuthGuard)
    @Patch("update")
    UpdateTaskDto(@Body( ValidationPipe) updateTaskDto:UpdateTaskDto,@CurrentUser() user:any){
     return this.taskService.UpdateTask(updateTaskDto,user)
    }



    @UseGuards(AuthGuard)
    @Delete("delete/:id")
   async DeleteTask(@Param("id") id:number,@CurrentUser() user:any){
    console.log("id ini delete is ",id)
    const  Isdeleted=await this.taskService.DeleTeTask(id,user)
    if(Isdeleted) return {
        status:200,
        message:"deleted successfully"
    }

    
    }
    @UseGuards(AuthGuard)
    @Get("s")
    async SearchTask(@Query () searchTaskDto:SearchTaskDto){
     console.log("I m cld ")
   return  this.taskService.Searchtask(searchTaskDto.title)
    }
}

