export interface Coordinates {
    lat: number;
    lng: number;
}

export interface PostLocation extends Coordinates {
    address: string;
    staticMapImageUrl: string;
}