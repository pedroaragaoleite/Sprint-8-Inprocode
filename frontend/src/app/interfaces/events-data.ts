export interface EventsData {
    id?: number,
    event_date: Date,
    name: string,
    city: string,
    type: string,
    route_type: string,
    distance: number,
    latitude?: number,
    longitude?: number
}
