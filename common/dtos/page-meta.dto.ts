import { PageOptionsDto } from "./page-options.dto"


export class PageMetaDto{

    page:number

    take:number

    itemCount:number

    hasPreviousPage:boolean

    hasNextPage:boolean

    pageCount:number
    constructor({itemCount,pageOptionsDto}){
      this.page=pageOptionsDto.page
      this.take=pageOptionsDto.take
      this.itemCount=itemCount
      this.pageCount=Math.ceil(this.itemCount / this.take)
      this.hasPreviousPage=this.page >1  
      this.hasNextPage=this.page < this.pageCount

    }
}