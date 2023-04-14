import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ReMyinder } from "../typeorm/entities/Remymind"
import { Repository } from "typeorm"
import { CreatereMinder } from "./dto/create-reminder.dto"

@Injectable()
export class RemymindService {
  constructor(
    @InjectRepository(ReMyinder)
    private readonly remymindRepository: Repository<ReMyinder>
  ) {}
  private readonly logger = new Logger(RemymindService.name)

  async createReminder(userId, createreMinder:CreatereMinder, file) {
    try {
      
      const { description, favorite, remindme, title } = createreMinder;
      const { img, voice } = file;
  
      const newMinder = this.remymindRepository.create({
        description,
        favorite,
        img: img ? img[0].path : null,
        remindme,
        title,
        voice: voice ? voice[0].path : null,
        user: userId.id,
      });
  
      const saveNewRemind = await this.remymindRepository.save(newMinder);
  
      return saveNewRemind
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        "Failed to create reminder",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllReminder(userId) {
    try {
      const getAllReminders = await this.remymindRepository.find({
        where: {
          user: { id: userId.id },
        },
      })
      return getAllReminders
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to get reminders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getReminder(userId, idReminder) {
    try {
      const getReminder = await this.remymindRepository.findOne({
        where: {
          user: { id: userId.id },
          id: idReminder,
        },
      });

      return getReminder
    } catch (error) {
       this.logger.error(error);
    throw new HttpException(
      'Failed to get reminder',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  }

  async updateReminder(
    userId,
    idReminder,
    createreMinder: CreatereMinder,
    file,
  ) {
    try {
      // const findreminder = await this.remymindRepository.findOne({
      //   where: {
      //     user: { id: userId.id },
      //     id: idReminder,
      //   },
      // })

      // if (!findreminder)
      //   return res
      //     .status(200)
      //     .send({ data: "reminder wasnt found", statusCode: 200 })

      const updateReminder= await this.remymindRepository.update(
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

      // return res
      //   .status(HttpStatus.OK)
      //   .send({ data: "reminder was updated", statusCode: HttpStatus.OK })
        return updateReminder
    } catch (error) {
      this.logger.error(error);
    throw new HttpException(
      'Failed to update reminder',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  }

  async deleteReminder(userId, idReminder) {
    try {
      const findreminder = await this.remymindRepository.findOne({
        where: {
          user: { id: userId.id },
          id: idReminder,
        },
      })

      await this.remymindRepository.delete({
        user: { id: userId.id },
        id: idReminder,
      })

      return findreminder
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
