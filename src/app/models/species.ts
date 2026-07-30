import { Coordinate } from "./coordinates";
import { Status } from "./enums";

export interface Species {
    id: number;
    scientificName: string;
    commonName: string;
    family: string;
    genus: string;
    distributionNotes: string;
    description: string;
    status: Status;
    imageUrl: string;
    coordinates: Coordinate[];
}