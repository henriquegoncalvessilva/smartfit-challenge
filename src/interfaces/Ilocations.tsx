export interface Location {
    id: number;
    title: string;
    content: string;
    opened: boolean;
    mask: "required" | "optional";
    towel: "required" | "optional";
    fountain: "partial" | "allowed" | "forbidden";
    locker_room: "allowed" | "not_allowed";
    schedules: Schedule[];
}

export interface Schedule {
    weekdays: string;
    hour: string;
}

export interface LocationData {
    current_country_id: number;
    locations: Location[];
}

export interface Schedule {
    weekdays: string;
    hour: string;
}

export interface Schedule {
    weekdays: string;
    hour: string;
}

export interface Location {
    id: number;
    title: string;
    content: string;
    opened: boolean;
    mask: "required" | "optional";
    towel: "required" | "optional";
    fountain: "partial" | "allowed" | "forbidden";
    locker_room: "allowed" | "not_allowed";
    schedules: Schedule[];
}

export interface LocationData {
    current_country_id: number;
    locations: Location[];
}
