import { Schema, Model, Document } from 'mongoose';
import { IGeoPlaceAttributes } from '../../interfaces';
import mongoose from 'mongoose';

type IGeoPlaceCreationAttributes = Omit<IGeoPlaceAttributes, '_id'>;

export interface IGeoPlaceDocument extends IGeoPlaceCreationAttributes, Document {}

type GeoPlaceModel = Model<IGeoPlaceDocument>;

const GeoPlaceSchema = new Schema<IGeoPlaceDocument, GeoPlaceModel>(
    {
        addressdetails: { type: Number, required: true },
        street: { type: String, required: true },
        town: { type: String, required: true },
        postalcode: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: false },
        state: { type: String, required: false },
        product: { type: String, required: false },
        infoMeta: { type: String, required: true },
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export const GeoPlace = mongoose.model<IGeoPlaceDocument, GeoPlaceModel>('GeoPlace', GeoPlaceSchema);

export default GeoPlace;
