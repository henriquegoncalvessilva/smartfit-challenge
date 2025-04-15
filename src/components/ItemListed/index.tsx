import React, { lazy } from "react";
import DOMPurify from "dompurify";
import { Suspense } from "react";
import { Location } from "../../interfaces/Ilocations";
const ItemImages = lazy(() => import("./ItemImages"));
const ScheduleList = lazy(() => import("../scheduleList"));

type ItemListProps = {
    title: string;
    status: boolean;
    content: string;
    item: Location;
    mask: string;
    towel: string;
    fountain: "partial" | "forbidden" | "allowed";
    locker_room: string;
};

const ItemListed = ({
    title,
    status,
    content,
    item,
    mask,
    fountain,
    towel,
    locker_room,
}: ItemListProps) => {
    function purify(text: string) {
        const message = DOMPurify.sanitize(text);
        return message;
    }

    return (
        <div className="p-4 w-60 bg-gray-200">
            <strong className={status ? "text-green-600" : "text-red-600"}>
                {status ? "Aberto" : "Fechado"}
            </strong>

            <p className="font-bold text-lg">{title}</p>

            <p
                dangerouslySetInnerHTML={{
                    __html: purify(content),
                }}
            ></p>
            <Suspense fallback={"Carregando..."}>
                <ItemImages
                    fountain={fountain}
                    mask={mask}
                    towel={towel}
                    locker_room={locker_room}
                />
            </Suspense>
            <hr className="border-gray-400" />
            <Suspense fallback={"Carregando..."}>
                <ScheduleList item={item} />
            </Suspense>
        </div>
    );
};

export default React.memo(ItemListed);
