import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "../../typeorm/entities/User"
import { UserDetails } from "../../utils/types"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async validateUser(details: UserDetails) {
    const user = await this.userRepository.findOneBy({ email: details.email })

    if (user) return user

    const newUser = this.userRepository.create(details)
    return this.userRepository.save(newUser)
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id })
    return user
  }
}
