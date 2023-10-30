import { Injectable } from '@nestjs/common';
import {Equipment} from "../schemas/equipments.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateEquipmentDto} from "../dto/equipment.dto";

@Injectable()
export class EquipmentService {
    constructor(@InjectModel(Equipment.name) private equipmentModel: Model<Equipment>) {}

    async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
        const createdEquipment = new this.equipmentModel(createEquipmentDto);
        return createdEquipment.save();
    }

    async getAll(): Promise<Equipment[]> {
        return this.equipmentModel.find().exec();
    }

    async update(id: string,equipmentDto: Equipment): Promise<Equipment> {
        return this.equipmentModel.findOneAndUpdate({ _id: id },{
            name : equipmentDto.name,
            serialNumber : equipmentDto.serialNumber
        }).exec();
    }

    async findOne(id: string): Promise<Equipment> {
        return this.equipmentModel.findOne({ _id: id }).exec();
    }

    async delete(id: string) {
        const deletedEquipment = await this.equipmentModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedEquipment;
    }
}
