import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MulterModule } from "@nestjs/platform-express"
import { TypeOrmModule } from "@nestjs/typeorm"
import { NotificationsService } from "src/notification/notification.service"
import { ReMyinder } from "src/typeorm/entities/Remymind"
import { RemymindController } from "./remymind.controller"
import { RemymindService } from "./remymind.service"

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ReMyinder]),
    MulterModule.register({
      dest: "./upload",
      limits: { fileSize: 100000000 },
    }),
  ],
  controllers: [RemymindController],
  providers: [
    NotificationsService,
    RemymindService,
    {
      provide: "Remymind_Service",
      useClass: RemymindService,
    },
  ],
})
export class RemymindModule {}
