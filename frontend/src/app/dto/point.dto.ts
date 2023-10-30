import {EquipmentDto} from "./equipment.dto";

export class PointDto {
    _id?: string;
    name?: string;
    dataType?: string;
    value?: string;
    equipment?: EquipmentDto
}
