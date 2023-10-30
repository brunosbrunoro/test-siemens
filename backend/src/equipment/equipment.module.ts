import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import {Equipment, EquipmentSchema} from "../schemas/equipments.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports:[MongooseModule.forFeature([{ name: Equipment.name, schema: EquipmentSchema }])],
  controllers: [EquipmentController],
  providers: [EquipmentService]
})
export class EquipmentModule {}
