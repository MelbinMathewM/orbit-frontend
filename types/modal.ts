export type ModalType =
    | "method"
    | "flight"
    | "trip"
    | "accommodation"
    | "star"
    | "days"
    | "vehicle"
    | "language"
    | "location"
    | "locations"
    | "activities"
    | null;

export type FlightModalType = "method" | "flight" | "trip";

export type DayTourModalType = "method" | "vehicle" | "location" | "activities";

export type HotelModalType = "method" | "accommodation" | "star";

export type OutstationModalType = | "method" | "days" | "vehicle" | "language" | "locations" | "activities";