import { DataSource } from "typeorm";

import * as dotenv from "dotenv"
dotenv.config()

console.log("pwd here is ",process.env.DB_PASSWORD)
export const AppDataSource=new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: ['dist/src/migrations/*.js'],
    //control the changes in the database through migrations
    // if true automtically syncs with the database
    synchronize: false,
})

