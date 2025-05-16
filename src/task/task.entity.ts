import { User } from "src/auth/User.entity";
import {
     Entity,
    PrimaryGeneratedColumn,
    Column,ManyToOne
 } from "typeorm";

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column({})
    description:string

    @Column({default:"Incomplete"})
    status:string

    @ManyToOne(()=>User,(user)=>user.tasks)
    user:User




}