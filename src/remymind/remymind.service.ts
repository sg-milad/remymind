import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ReMyinder} from 'src/typeorm/entities/Remymind';
import {Repository} from 'typeorm';
import {CreatereMinder} from './dto/create-reminder.dto';


@Injectable()
export class RemymindService {
    constructor(
        @InjectRepository(ReMyinder) private readonly remymindRepository : Repository < ReMyinder >,
        ) {}
        private readonly logger = new Logger(RemymindService.name)

    async createreMinder(userId,createreMinder : CreatereMinder ) {
        try {

            const newMinder = this.remymindRepository.create({
                description: createreMinder.description,
                favorite: createreMinder.favorite,
                img: createreMinder.img,
                remindme: createreMinder.remindme,
                title: createreMinder.title,
                voice: createreMinder.voice,
                user: userId.id
            });
            const saveNewRemind = await this.remymindRepository.save(newMinder);
            if (! newMinder) {
                return {status: HttpStatus.BAD_REQUEST, data: "reminder doesnt created ", seccess: false};
            }
            return {status: HttpStatus.CREATED, data: saveNewRemind, success: true};
        } catch (error) {
           this.logger.error(error)
            throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllReminder(userId) {
        try {
            const getAllReminder = await this.remymindRepository.findBy({user: userId.id})

            if (! getAllReminder) {
                return {status: HttpStatus.NO_CONTENT, data: "no content", success: false}
            }
            return getAllReminder

        } catch (error) {
            this.logger.error(error)
            throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getReminder(userId, idReminder) {
        try {
            const getReminder = await this.remymindRepository.findOne({
                where: {
                    user: userId.id,
                    id: idReminder
                }
            })
            if (! getReminder) {
                return {status: HttpStatus.BAD_REQUEST, data: "not found ", seccess: false}
            }
            return getReminder
        } catch (error) {
            this.logger.error(error)
            throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateReminder(userId, idReminder, createreMinder : CreatereMinder) {
        try {
            const updateReminder: any = await this.remymindRepository.update({
                user: userId.id,
                id: idReminder
            }, createreMinder)

            if (updateReminder.affected === 0) {
                return {status: HttpStatus.BAD_REQUEST, data: "error", seccess: false}
            }
            return {status: HttpStatus.CREATED, data: "updated sccussfuly", seccess: true}
        } catch (error) {
            this.logger.error(error)
          throw new HttpException("INTERNAL_SERVER_ERROR",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteReminder(userId, idReminder) {
        try {
            const deleteReminder = await this.remymindRepository.delete({user: userId.id, id: idReminder})
            if (deleteReminder.affected === 0 || !deleteReminder) {
                return {status: HttpStatus.BAD_REQUEST, data: "dont fund", seccess: false}
            }
            return {status: HttpStatus.CREATED, data: "delete sccessfuly", seccess: true}
        } catch (error) {
            this.logger.error(error)
          throw new HttpException("INTERNAL_SERVER_ERROR",HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
