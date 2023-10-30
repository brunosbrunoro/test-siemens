import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { EquipmentModule } from './equipment/equipment.module';
import { PointModule } from './point/point.module';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),EquipmentModule, PointModule],
})
export class AppModule {}
