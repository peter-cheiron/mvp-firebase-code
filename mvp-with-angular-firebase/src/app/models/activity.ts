export interface Location {
    name: string;
    address: string;
    placeId: string;
}

export interface Activity {
    id?: string;
    location: Location;
    name:string;
    website?: string;
    description?:string;
    category: string;
}