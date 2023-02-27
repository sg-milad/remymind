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

  async createReminder(userId, createreMinder: CreatereMinder, file, res) {
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
        throw new HttpException(
          "reminder wasnt created",
          HttpStatus.BAD_REQUEST
        )
      }
      return res
        .status(201)
        .send({ data: saveNewRemind, stasuseCode: HttpStatus.CREATED })
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getAllReminder(userId, res) {
    try {
      const getAllReminde = await this.remymindRepository.find({
        where: {
          user: { id: userId.id },
        },
      })
      return res.status(200).send({ statusCode: 200, data: getAllReminde })
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getReminder(userId, idReminder, res) {
    try {
      const getReminder = await this.remymindRepository.find({
        where: {
          user: { id: userId.id },
          id: idReminder,
        },
      })

      return res.status(200).send({ statusCode: 200, data: getReminder })
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

      if (findreminder === null)
        return res
          .status(200)
          .send({ data: "reminder wasnt found", statusCode: 200 });

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
      console.log(error)

      this.logger.error(error)
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
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
        return res
          .status(HttpStatus.ACCEPTED)
          .send({
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
