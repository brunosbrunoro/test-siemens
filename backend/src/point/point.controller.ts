import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PointService} from "./point.service";
import {Point} from "../schemas/point.schema";
import {CreatePointDto} from "../dto/point.dto";
import {Equipment} from "../schemas/equipments.schema";

@Controller('point')
export class PointController {
    constructor(private _pointService: PointService) {
    }
    @Get()
    getAll(): Promise<Point[]>  {
        return this._pointService.getAll();
    }

    @Get('/equipment/:id')
    getAllEquipment(@Param('id') id: string): Promise<Point[]>  {
        return this._pointService.getAllEquipment(id);
    }

    @Post()
    create(@Body() dto: CreatePointDto): Promise<Point>{
        return this._pointService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string,@Body() dto: Point): Promise<Point>{
        return this._pointService.update(id,dto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Point> {
        return this._pointService.findOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this._pointService.delete(id);
    }
}
