import { BadRequestException, Injectable, NotFoundException, Query, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskDto } from './Dto/task.dto';
import { UpdateTaskDto } from './Dto/updatetask.dto';
import { PageOptionsDto } from 'common/dtos/page-options.dto';
import { PageMetaDto } from 'common/dtos/page-meta.dto';
import { PaginatedResponse } from 'common/dtos/paginated-response.dto';

@Injectable()
export class TaskService {
    constructor(

    @InjectRepository(Task)
private readonly taskRepo:Repository<Task>
    ){}

   async Create(taskdto:TaskDto,user:any)
    {
   return this.taskRepo.save({...taskdto,user:user.id})

   
    }

  async  getAllTasks(pageOptionsDto:PageOptionsDto,user:any):Promise<any>{

      const queryBuilder =  this.taskRepo.createQueryBuilder("task")
      queryBuilder
      .where("task.userId = :userId", { userId: user.id })
      .skip((pageOptionsDto.page-1 ) * pageOptionsDto.take)
      .take(pageOptionsDto.take)
      ;

      const itemCount=await queryBuilder.getCount()
      const {entities}=await queryBuilder.getRawAndEntities()
      
      const pageMeta=new PageMetaDto({itemCount, pageOptionsDto})
     return  new PaginatedResponse(entities,pageMeta)
     

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

    async Searchtask(title:string){
     console.log("service call reached")
     // return this.taskRepo.findOne({where:{title:title}})
      
    }
}
