import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreatePointDto} from "../dto/point.dto";
import {Point} from "../schemas/point.schema";
import {Equipment} from "../schemas/equipments.schema";

@Injectable()
export class PointService {
    constructor(@InjectModel(Point.name) private equipmentModel: Model<Point>) {
    }

    async create(createPointDto: CreatePointDto): Promise<Point> {
        const createdPoint = new this.equipmentModel(createPointDto);
        return createdPoint.save();
    }

    async getAll(): Promise<Point[]> {
        return this.equipmentModel.find().exec();
    }

    async getAllEquipment(equipmentId: string): Promise<Point[]> {
        return this.equipmentModel.find({ equipment: equipmentId }).exec();
    }

    async update(id: string,pointDto: Point): Promise<Point> {
        return this.equipmentModel.findOneAndUpdate({ _id: id },{
            name : pointDto.name,
            dataType : pointDto.dataType,
            value : pointDto.value,
            equipment : pointDto.equipment
        }).exec();
    }

    async findOne(id: string): Promise<Point> {
        return this.equipmentModel.findOne({_id: id}).exec();
    }

    async delete(id: string) {
        const deletedPoint = await this.equipmentModel
            .findByIdAndRemove({_id: id})
            .exec();
        return deletedPoint;
    }
}
