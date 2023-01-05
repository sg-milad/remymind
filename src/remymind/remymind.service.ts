import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ReMyinder } from "src/typeorm/entities/Remymind"
import { Repository } from "typeorm"
import { CreatereMinder } from "./dto/create-reminder.dto"

@Injectable()
export class RemymindService {
  constructor(
    @InjectRepository(ReMyinder)
    private readonly remymindRepository: Repository<ReMyinder>
  ) {}
  private readonly logger = new Logger(RemymindService.name)

  async createReminder(userId, createreMinder: CreatereMinder, file) {
    try {
      const newMinder = this.remymindRepository.create({
        description: createreMinder.description,
        favorite: createreMinder.favorite,
        img: file.img ? file.img[0].path : null,
        remindme: createreMinder.remindme,
        title: createreMinder.title,
        voice: file.voice ? file.voice[0].path : null,
        user: userId.id,
      })
      const saveNewRemind = await this.remymindRepository.save(newMinder)
      if (!newMinder) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: "reminder doesnt created ",
          seccess: false,
        }
      }
      return { status: HttpStatus.CREATED, data: saveNewRemind, success: true }
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getAllReminder(userId) {
    try {
      // const getAllReminder = await this.remymindRepository.findBy({user:{id:userId.id}})

      const getAllReminder = await this.remymindRepository.find({
        where: {
          user: { id: userId.id },
        },
      })

      if (getAllReminder.length === 0) {
        return {
          status: HttpStatus.NO_CONTENT,
          data: "no content",
          success: false,
        }
      }
      return { status: HttpStatus.OK, data: getAllReminder, success: true }
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getReminder(userId, idReminder) {
    try {
      const getReminder = await this.remymindRepository.find({
        where: {
          user: { id: userId.id },
          id: idReminder,
        },
      })
      if (getReminder.length === 0) {
        return {
          status: HttpStatus.NO_CONTENT,
          data: "not found ",
          seccess: false,
        }
      }
      return { status: HttpStatus.ACCEPTED, data: getReminder, success: true }
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async updateReminder(
    userId,
    idReminder,
    createreMinder: CreatereMinder,
    file
  ) {
    try {
      const updateReminder = await this.remymindRepository.update(
        {
          user: { id: userId.id },
          id: idReminder,
        },
        {
          description: createreMinder.description,
          favorite: createreMinder.favorite,
          img: file.img ? file.img[0].path : null,
          remindme: createreMinder.remindme,
          title: createreMinder.title,
          voice: file.voice ? file.voice[0].path : null,
        }
      )

      if (updateReminder.affected === 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: "error",
          seccess: false,
        }
      }
      return {
        status: HttpStatus.CREATED,
        data: "updated sccussfuly",
        seccess: true,
      }
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async deleteReminder(userId, idReminder) {
    try {
      const deleteReminder = await this.remymindRepository.delete({
        user: { id: userId.id },
        id: idReminder,
      })
      if (deleteReminder.affected === 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: "not found",
          seccess: false,
        }
      }
      return {
        status: HttpStatus.CREATED,
        data: "delete sccessfuly",
        seccess: true,
      }
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
