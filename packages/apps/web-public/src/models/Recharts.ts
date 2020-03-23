// Very similar to `SensorDataResponse`, but for Recharts, the object needs
// to be overloaded in order to represent multiple lines at once
export interface RechartsSensorDataResponse {
    time: Date;
    [key: string]: number | Date; // This is quite silly and should just be a string, but doesn't seem to work
}
