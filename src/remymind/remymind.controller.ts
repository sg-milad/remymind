import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { CreatereMinder } from './dto/create-reminder.dto';
import { RemymindService } from './remymind.service';

@Controller('remymind')
export class RemymindController {
  constructor(private readonly remyMindService: RemymindService) {}

  @Post()
  createreminder(@CurrentUser() user, @Body() createreMinder: CreatereMinder ) {
    return this.remyMindService.createreMinder(user,createreMinder);
  }

  @Get()
  getAllReminder(@CurrentUser() user ){
    return this.remyMindService.getAllReminder(user)
  }

  @Get(":id")
  getreminder(@CurrentUser() user, @Param("id",ParseIntPipe) id ){
    return this.remyMindService.getReminder(user,id)
  }
  
  @Patch(":id")
  updateReminder(@CurrentUser() user, @Param("id",ParseIntPipe) id ,@Body() createreMinder:CreatereMinder){
    return this.remyMindService.updateReminder(user,id,createreMinder)
  }

  @Delete(":id")
  deleteReminder(@CurrentUser() user, @Param("id",ParseIntPipe) id  ){
    return this.remyMindService.deleteReminder(user,id)
  }  
}
