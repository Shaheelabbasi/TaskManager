import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskDto } from './Dto/task.dto';
import { UpdateTaskDto } from './Dto/updatetask.dto';

@Injectable()
export class TaskService {
    constructor(

    @InjectRepository(Task)
private readonly taskRepo:Repository<Task>
    ){}

   async Create(taskdto:TaskDto,user:any)
    {
        console.log("user received here in task service is ",user)
   return this.taskRepo.save({...taskdto,user:user.id})
    }

  async  getAllTasks(user:any):Promise<Task[]>{
        console.log("user received here is ",user)
      return this.taskRepo.find({where: { user: user.id }})
     

    } 
    async getTask(taskId:number,user:any)
        {
          const task=await this.taskRepo.findOne({where:{ user:user.id ,id:taskId}})
          console.log("task is ",task)
          if(!task)
          {
            throw new NotFoundException("task not found for current user")
          }
          return task
        }

    async UpdateTask(updateTaskDto:UpdateTaskDto,user:any){

      const task=await this.taskRepo.findOne({where:{user:user.id,id:updateTaskDto.id}})
      if(!task) throw new BadRequestException("task not found for current user")

        task.description=updateTaskDto?.description
        task.status=updateTaskDto?.status
        task.title=updateTaskDto?.title
        return this.taskRepo.save(task)
    }    
    async DeleTeTask(taskId:number,user:any){
    
        const IsExisting=await this.taskRepo.findOne({where:{user:user.id,id:taskId}})
        if(!IsExisting)
            throw new BadRequestException("no task found")
        const Isdeleted=await this.taskRepo.delete(taskId)
        return Isdeleted
    }
}
