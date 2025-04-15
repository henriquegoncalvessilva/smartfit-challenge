import React, { Suspense, useMemo } from "react";

import { lazy } from "react";
const ScheduleList = lazy(() => import("../scheduleList/index"));
import { useContextLocations } from "../../context/context";
import DOMPurify from "dompurify";
import { Location } from "../../interfaces/ILocations";

type FountainStatus = "partial" | "forbidden";

const ListItem = () => {
    const { filteredDataInfo } = useContextLocations();

    function purifyContent(text: string) {
        const message = DOMPurify.sanitize(text);
        return message;
    }

    const memoizedLocations = useMemo(() => {
        return filteredDataInfo?.locations || [];
    }, [filteredDataInfo]);

    function getIconMask(status: string) {
        switch (status) {
            case "required":
                return "https://raw.githubusercontent.com/FelipeSantanaa/smartfit-test/refs/heads/main/material/_material/images/required-mask.png";

            default:
                return "https://raw.githubusercontent.com/FelipeSantanaa/smartfit-test/refs/heads/main/material/_material/images/recommended-mask.png";
        }
    }

    function getTowel(status: string) {
        switch (status) {
            case "required":
                return "https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/required-towel.png?raw=true";

            default:
                return "https://raw.githubusercontent.com/FelipeSantanaa/smartfit-test/refs/heads/main/material/_material/images/recommended-towel.png";
        }
    }
    function getFountainImageUrl(status: FountainStatus): string {
        const fileName = fountainMap[status] || "forbidden-fountain.png";
        return `https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/${fileName}?raw=true`;
    }

    function getLockerRoom(status: string) {
        switch (status) {
            case "not_allowed":
                return "https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/forbidden-lockerroom.png?raw=true";

            default:
                return "https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/required-lockerroom.png?raw=true";
        }
    }

    const fountainMap: Record<FountainStatus, string> = {
        partial: "partial-fountain.png",
        forbidden: "forbidden-fountain.png",
    };

    return (
        <>
            <section className="flex justify-center items-center gap-4 flex-wrap desktop:flex-nowrap tablet:flex-nowrap  bg-gray-200 rounded-md w-full p-4">
                <div className="flex gap-2 justify-center items-center w-full flex-col">
                    <strong>Máscara</strong>
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex flex-col gap-1 justify-center items-center text-center">
                            <img
                                className="w-12 h-12"
                                src="https://raw.githubusercontent.com/FelipeSantanaa/smartfit-test/refs/heads/main/material/_material/images/required-mask.png"
                                alt=""
                            />
                            <p>Obrigatório</p>
                        </div>
                        <div className="flex flex-col gap-1  justify-center items-center text-center">
                            <img
                                className="w-12 h-12"
                                src="https://raw.githubusercontent.com/FelipeSantanaa/smartfit-test/refs/heads/main/material/_material/images/required-mask.png"
                                alt=""
                            />
                            <p>Recomendado</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 justify-center items-center  w-full flex-col">
                    <strong>Toalha</strong>
                    <div className="flex items-center gap-4 justify-center">
                        <div className="flex flex-col gap-1 items-center text-center">
                            <img
                                className="w-12 h-12"
                                src="https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/required-towel.png?raw=true"
                                alt=""
                            />
                            <p>Obrigatório</p>
                        </div>
                        <div className="flex flex-col gap-1 items-center text-center">
                            <img
                                className="w-12 h-12"
                                src="https://raw.githubusercontent.com/FelipeSantanaa/smartfit-test/refs/heads/main/material/_material/images/recommended-towel.png"
                                alt=""
                            />
                            <p>Recomendado</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 justify-center items-center  w-full flex-col">
                    <strong>Bebedouro</strong>
                    <div className="flex items-center gap-4 justify-center">
                        <div className="flex flex-col gap-1 items-center text-center">
                            <img
                                className="w-12 h-12"
                                src="https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/partial-fountain.png?raw=true"
                                alt=""
                            />
                            <p>Parcial</p>
                        </div>
                        <div className="flex flex-col gap-1 items-center justify-center">
                            <img
                                className="w-12 h-12"
                                src="https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/forbidden-fountain.png?raw=true"
                                alt=""
                            />
                            <p>Proibido</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 justify-center items-center  w-full flex-col">
                    <strong>Vestiários</strong>
                    <div className="flex items-center gap-4 justify-center">
                        <div className="flex flex-col gap-1 items-center text-center">
                            <img
                                className="w-12 h-12"
                                src="https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/required-lockerroom.png?raw=true"
                                alt=""
                            />
                            <p>Liberado</p>
                        </div>
                        <div className="flex flex-col gap-1 items-center text-center">
                            <img
                                className="w-12 h-12"
                                src="https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/partial-lockerroom.png?raw=true"
                                alt=""
                            />
                            <p>Parcial</p>
                        </div>
                        <div className="flex flex-col gap-1 items-center text-center">
                            <img
                                className="w-12 h-12"
                                src="https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/forbidden-lockerroom.png?raw=true"
                                alt=""
                            />
                            <p>Fechado</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="justify-center flex flex-column w-full flex-wrap gap-x-10 gap-y-10 max-tablet:justify-around tablet:gap-x-6  desktop:justify-between">
                {filteredDataInfo?.locations.length === 0 ? (
                    "Nenhum dos dados foram encontrados"
                ) : (
                    <>
                        <Suspense
                            fallback={
                                <h1 className="text-3xl">Carregando...</h1>
                            }
                        >
                            {memoizedLocations.map(
                                (
                                    item: Location,
                                    index: React.Key | null | undefined
                                ) => (
                                    <div
                                        key={index}
                                        className="p-4 w-60 bg-gray-200 rounded-md"
                                    >
                                        <strong
                                            className={`
                                                text-[12px]
                                                ${
                                                    item.opened
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }
                                            `}
                                        >
                                            {item.opened ? "Aberto" : "Fechado"}
                                        </strong>

                                        <p className="font-bold text-lg py-1">
                                            {item.title}
                                        </p>

                                        <p
                                            className="text-sm text-gray-500"
                                            dangerouslySetInnerHTML={{
                                                __html: purifyContent(
                                                    item.content
                                                ),
                                            }}
                                        ></p>
                                        <hr className="border-gray-400 mt-2" />

                                        <section className="flex flex-row gap-1 py-3">
                                            <img
                                                className="w-12 h-12"
                                                src={getIconMask(item.mask)}
                                                alt="icone máscara"
                                            />

                                            <img
                                                className="w-12 h-12"
                                                src={getTowel(item.towel)}
                                                alt="icone toalha"
                                            />
                                            <img
                                                className="w-12 h-12"
                                                src={getFountainImageUrl(
                                                    item.fountain as FountainStatus
                                                )}
                                                alt="icone bebedouro"
                                            />

                                            <img
                                                className="w-12 h-12"
                                                src={getLockerRoom(
                                                    item.locker_room
                                                )}
                                                alt="icone vestiário"
                                            />
                                        </section>
                                        <Suspense fallback={"Carregando..."}>
                                            <ScheduleList item={item} />
                                        </Suspense>
                                    </div>
                                )
                            )}
                        </Suspense>
                    </>
                )}
            </section>
        </>
    );
};

export default React.memo(ListItem);
