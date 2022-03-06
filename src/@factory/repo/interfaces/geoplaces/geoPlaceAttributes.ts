export interface IGeoPlaceAttributes {
    _id?: string;
    product?: string | null;
    limit?: number | null;
    addressdetails: number;
    street: string;
    town: string;
    postalcode: string;
    country: string;
    city?: string;
    state?: string;
    infoMeta?: string;
    lat?: number;
    lon?: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface IGeoWeatherAttributes {
    _id?: string;
    lat?: number;
    lon?: number;
    product?: string | null;
    infoMeta?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
