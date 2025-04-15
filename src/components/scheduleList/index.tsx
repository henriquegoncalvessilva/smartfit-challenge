import React from "react";
import { Location } from "../../interfaces/ILocations";

type ScheduleListProps = {
    item: Location;
};

const ScheduleList = ({ item }: ScheduleListProps) => {
    return (
        <div className="flex flex-wrap">
            {item.schedules?.map((schedule, index) => {
                return (
                    <div key={index} className="w-24 py-2">
                        <p className="font-bold text-1xl">
                            {schedule.weekdays}
                        </p>
                        <p>{schedule.hour}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(ScheduleList);
