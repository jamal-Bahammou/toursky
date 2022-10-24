export interface Tour {
    _id:             string;
    description:     string;
    difficulty:      string;
    duration:        number;
    durationWeeks:   number;
    guides:          Guide[];
    id:              string;
    imageCover:      string;
    images:          string[];
    locations:       Location[];
    maxGroupSize:    number;
    name:            string;
    price:           number;
    ratingsAverage:  number;
    ratingsQuantity: number;
    reviews:         Review[];
    secretTour:      boolean;
    slug:            string;
    startDates:      Date[];
    startLocation:   StartLocation;
    summary:         string;
}

export interface Guide {
    _id:   string;
    email: string;
    name:  string;
    photo: string;
    role:  Role;
}

export enum Role {
    Guide = "guide",
    LeadGuide = "lead-guide",
}

export interface Location {
    _id:         string;
    coordinates: number[];
    day:         number;
    description: string;
    type:        Type;
}

export enum Type {
    Point = "Point",
}

export interface StartLocation {
    address:     string;
    coordinates: number[];
    description: string;
    type:        Type;
}

export interface Review {
    __v:       number;
    _id:       string;
    createdAt: Date;
    id:        string;
    rating:    number;
    review:    string;
    tour:      string;
    user:      User;
}
   
export interface User {
    __v:   number;
    _id:   string;
    name:  string;
    email:  string;
    photo: string;
    role:  string;
}

export interface Cookie {
    jwt: string
}

export interface Alert {
    status: boolean,
    type: TypeAlert,
    message: string
}

export enum TypeAlert {
    Nan = "",
    Success = "success",
    Error = "error"
}

export interface Store {
    authenticator: boolean,
    user: User,
    tours: Tour[],
    alertPopup: TypeAlert,
}