import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
  HttpStatus
} from "@nestjs/common"
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { CurrentUser } from "../common/decorator/current-user.decorator"
import { CreatereMinder } from "./dto/create-reminder.dto"
import { RemymindService } from "./remymind.service"
import { Response } from "express"

@Controller("remymind")
export class RemymindController {
  constructor(private readonly remyMindService: RemymindService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "img", maxCount: 1 },
      { name: "voice", maxCount: 1 },
    ])
  )
  async createreminder(
    @CurrentUser() user,
    @Body() createreMinder: CreatereMinder,
    @UploadedFiles()
    file: { img?: Express.Multer.File[]; voice?: Express.Multer.File[] },
    @Res() res: Response
  ) {
    const createReminder = await this.remyMindService.createReminder(
      user,
      createreMinder,
      file,
      
    )
      return res.send({statusCode:HttpStatus.CREATED ,data:createReminder})
  }

  @Get()
  async getAllReminder(@CurrentUser() user, @Res() res: Response) {
    const getAll = await this.remyMindService.getAllReminder(user)
    
      if (getAll.length ===0){
       return  res.send({
        statusCode:HttpStatus.NO_CONTENT,data:null
        })
      }  
    return res.send(getAll)
  }

  @Get(":id") async getreminder(
    @CurrentUser() user,
    @Param("id", ParseIntPipe) id,
    @Res() res: Response
  ) {
    const getReminder = await this.remyMindService.getReminder(user, id)
    
    res.send({statusCode:HttpStatus.OK,data:getReminder})
  }

  @Patch(":id")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "img", maxCount: 1 },
      { name: "voice", maxCount: 1 },
    ])
  )
  async updateReminder(
    @Res() res: Response,
    @CurrentUser() user,
    @Param("id", ParseIntPipe) id,
    @Body() createreMinder: CreatereMinder,
    @UploadedFiles()
    file: { img?: Express.Multer.File[]; voice?: Express.Multer.File[] }
  ) {
    const updateReminder = await this.remyMindService.updateReminder(
      user,
      id,
      createreMinder,
      file,
    )
    if(updateReminder.affected === 0) return res.send({statusCode:HttpStatus.OK,data:"reminder wasn't found"})
    res.send({statusCode:HttpStatus.ACCEPTED , data:"reminder was updated"})
  }

  @Delete(":id")
  async deleteReminder(
    @CurrentUser() user,
    @Param("id", ParseIntPipe) id,
    @Res() res: Response
  ) {
    const deleteReminder= await this.remyMindService.deleteReminder(user, id)

  if (!deleteReminder) {
        return res.status(HttpStatus.ACCEPTED).send({
          data: "reminder wasnt founded",
          statusCode: HttpStatus.NO_CONTENT,
        })
      }
      return res.send({
        data:"reminder deleted seccussfuly",
        statusCode:HttpStatus.ACCEPTED
      })
  }
}
