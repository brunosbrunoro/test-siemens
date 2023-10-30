import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {Equipment} from "./equipments.schema";

export type PointDocument = HydratedDocument<Point>;

@Schema()
export class Point {
    @Prop()
    name: string;

    @Prop()
    dataType: string;

    @Prop()
    value: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' })
    equipment: Equipment
}

export const PointSchema = SchemaFactory.createForClass(Point);
