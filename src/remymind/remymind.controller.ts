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
    return await this.remyMindService.createReminder(
      user,
      createreMinder,
      file,
      res
    )
  }

  @Get()
  async getAllReminder(@CurrentUser() user, @Res() res: Response) {
    return await this.remyMindService.getAllReminder(user, res)
  }

  @Get(":id") async getreminder(
    @CurrentUser() user,
    @Param("id", ParseIntPipe) id,
    @Res() res: Response
  ) {
    return await this.remyMindService.getReminder(user, id, res)
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
    return await this.remyMindService.updateReminder(
      user,
      id,
      createreMinder,
      file,
      res
    )
  }

  @Delete(":id")
  async deleteReminder(
    @CurrentUser() user,
    @Param("id", ParseIntPipe) id,
    @Res() res: Response
  ) {
    return await this.remyMindService.deleteReminder(user, id, res)
  }
}
