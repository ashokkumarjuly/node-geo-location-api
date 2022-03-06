import { Schema, Model, Document } from 'mongoose';
import { IGeoWeatherAttributes } from '../../interfaces';
import mongoose from 'mongoose';

type IGeoWeatherCreationAttributes = Omit<IGeoWeatherAttributes, '_id'>;

export interface IGeoWeatherDocument extends IGeoWeatherCreationAttributes, Document {}

type GeoWeatherModel = Model<IGeoWeatherDocument>;

const GeoWeatherSchema = new Schema<IGeoWeatherDocument, GeoWeatherModel>(
    {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
        infoMeta: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export const GeoWeather = mongoose.model<IGeoWeatherDocument, GeoWeatherModel>('GeoWeather', GeoWeatherSchema);

export default GeoWeather;
