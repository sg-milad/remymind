import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReMyinder } from 'src/typeorm/entities/Remymind';
import { RemymindController } from './remymind.controller';
import { RemymindService } from './remymind.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReMyinder])],
  controllers: [RemymindController],
  providers: [
    RemymindService,
    {
      provide: 'Remymind_Service',
      useClass: RemymindService,
    },
  ],
})
export class RemymindModule {}
