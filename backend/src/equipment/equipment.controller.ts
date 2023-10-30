import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {EquipmentService} from "./equipment.service";
import {Equipment} from "../schemas/equipments.schema";
import {CreateEquipmentDto} from "../dto/equipment.dto";

@Controller('equipment')
export class EquipmentController {

    constructor(private _equipmentService: EquipmentService) {
    }
    @Get()
    getAll(): Promise<Equipment[]>  {
        return this._equipmentService.getAll();
    }

    @Post()
    create(@Body() dto: CreateEquipmentDto): Promise<Equipment>{
        return this._equipmentService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string,@Body() dto: Equipment): Promise<Equipment>{
        return this._equipmentService.update(id,dto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Equipment> {
        return this._equipmentService.findOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this._equipmentService.delete(id);
    }
}
