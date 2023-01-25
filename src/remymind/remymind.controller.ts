import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common"
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { CurrentUser } from "src/common/decorator/current-user.decorator"
import { CreatereMinder } from "./dto/create-reminder.dto"
import { RemymindService } from "./remymind.service"
import { NotificationsService } from "src/notification/notification.service"

@Controller("remymind")
export class RemymindController {
  constructor(
    private readonly remyMindService: RemymindService,
    private readonly notify: NotificationsService
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "img", maxCount: 1 },
      { name: "voice", maxCount: 1 },
    ])
  )
  createreminder(
    @CurrentUser() user,
    @Body() createreMinder: CreatereMinder,
    @UploadedFiles()
    file: { img?: Express.Multer.File[]; voice?: Express.Multer.File[] }
  ) {
    return this.remyMindService.createReminder(user, createreMinder, file)
  }

  @Get() getAllReminder(@CurrentUser() user) {
    return this.remyMindService.getAllReminder(user)
  }

  @Get(":id") getreminder(@CurrentUser() user, @Param("id", ParseIntPipe) id) {
    return this.remyMindService.getReminder(user, id)
  }

  @Patch(":id")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "img", maxCount: 1 },
      { name: "voice", maxCount: 1 },
    ])
  )
  updateReminder(
    @CurrentUser() user,
    @Param("id", ParseIntPipe) id,
    @Body() createreMinder: CreatereMinder,
    @UploadedFiles()
    file: { img?: Express.Multer.File[]; voice?: Express.Multer.File[] }
  ) {
    return this.remyMindService.updateReminder(user, id, createreMinder, file)
  }

  @Delete(":id") deleteReminder(
    @CurrentUser() user,
    @Param("id", ParseIntPipe) id
  ) {
    return this.remyMindService.deleteReminder(user, id)
  }

  @Post("/notif")
  async sendnotif(@Headers("Authorization") fcmtoken, @Body() payload ) {
    console.log(fcmtoken);
    console.log(payload);
    try {
      return await this.notify.sendNotification(fcmtoken,payload.title,payload.body)
      
    } catch (error) {
      console.log(error);
      
    }
  }
}
