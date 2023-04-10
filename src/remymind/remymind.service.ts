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

  async createReminder(userId, createreMinder:CreatereMinder, file, res) {
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
  
      return res
        .status(HttpStatus.CREATED)
        .send({ data: saveNewRemind, stasuseCode: HttpStatus.CREATED });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        "Failed to create reminder",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllReminder(userId, res) {
    try {
      const getAllReminders = await this.remymindRepository.find({
        where: {
          user: { id: userId.id },
        },
      })
      return res.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, data: getAllReminders });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to get reminders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getReminder(userId, idReminder, res) {
    try {
      const reminder = await this.remymindRepository.findOne({
        where: {
          user: { id: userId.id },
          id: idReminder,
        },
      });

      if (!reminder) {
        throw new HttpException('Reminder not found', HttpStatus.NOT_FOUND);
      }

      return res.status(200).send({ statusCode: 200, data: reminder })
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
    res
  ) {
    try {
      const findreminder = await this.remymindRepository.findOne({
        where: {
          user: { id: userId.id },
          id: idReminder,
        },
      })

      if (!findreminder)
        return res
          .status(200)
          .send({ data: "reminder wasnt found", statusCode: 200 })

      await this.remymindRepository.update(
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

      return res
        .status(HttpStatus.OK)
        .send({ data: "reminder was updated", statusCode: HttpStatus.OK })
    } catch (error) {
      this.logger.error(error);
    throw new HttpException(
      'Failed to update reminder',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  }

  async deleteReminder(userId, idReminder, res) {
    try {
      const findreminder = await this.remymindRepository.findOne({
        where: {
          user: { id: userId.id },
          id: idReminder,
        },
      })

      if (findreminder === null) {
        return res.status(HttpStatus.ACCEPTED).send({
          data: "reminder wasnt founded",
          statusCode: HttpStatus.ACCEPTED,
        })
      }
      await this.remymindRepository.delete({
        user: { id: userId.id },
        id: idReminder,
      })

      return res
        .status(HttpStatus.ACCEPTED)
        .send({ data: "reminder was deleted", statusCode: HttpStatus.ACCEPTED })
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
