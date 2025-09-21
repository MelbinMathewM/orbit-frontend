export interface FlightEnquiryFormType {
    _id? : string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    methodContact: string;
    flightName: string;
    tripSelection: string;
    from: string;
    to: string;
    startDate: string | Date;
    endDate: string | Date;
    adultNumber: string;
    childNumber: string;
    infantNumber: string;
    additionalRequirements: string;
};

export interface HotelBookingFormType {
    _id?: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    methodContact: string;
    accommodationType: string;
    starRating: string;
    roomType: string;
    adultNumber: string;
    childNumber: string;
    infantNumber: string;
    additionalRequirements: string;
};

export interface OutstationBookingFormType {
    _id?: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    methodContact: string;
    pickUp: string;
    dropOff: string;
    adultNumber: string;
    childNumber: string;
    infantNumber: string;
    numberOfDays: string;
    vehicleType: string;
    language: string;
    locations: string[];
    activities: string;
    budget: string | number;
    additionalRequirements: string;
};

export interface DayTourEnquiryFormType {
    _id?: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    methodContact: string;
    pickUp: string;
    dropOff: string;
    date: Date | string;
    time: string;
    adultNumber: string;
    childNumber: string;
    infantNumber: string;
    vehicleType: string;
    location: string;
    activities: string;
    budget: string | number;
    additionalRequirements: string;
};

export interface WellnessPackageFormType {
    _id? : string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    packageType: string;
    numberOfDays: string;
    adultNumber: string;
    additionalRequirements: string;
};