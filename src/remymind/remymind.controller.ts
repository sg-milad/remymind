import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreatereMinder } from './dto/create-reminder.dto';
import { RemymindService } from './remymind.service';

@Controller('remymind')
export class RemymindController {
  constructor(private readonly remyMindService: RemymindService) {}

  @Post()
  createreminder(@Body() createreMinder: CreatereMinder , @Req() request:Request ) {
   if(request.user === undefined) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.remyMindService.createreMinder(createreMinder,request.user);
  }

  @Get()
  getAllReminder(@Req() request:Request ){
    if(request.user === undefined) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.remyMindService.getAllReminder(request.user)
  }

  @Get(":id")
  getreminder(@Req() request:Request, @Param("id") id ){
    if(request.user === undefined) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.remyMindService.getReminder(request.user,id)
  }
  
  @Patch(":id")
  updateReminder(@Req() request:Request, @Param("id") id ,@Body() createreMinder:CreatereMinder){
    if(request.user === undefined) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.remyMindService.updateReminder(request.user,id,createreMinder)
  }

  @Delete(":id")
  deleteReminder(@Req() request:Request, @Param("id") id ){
    if(request.user === undefined) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.remyMindService.deleteReminder(request.user,id)
  }  
}
