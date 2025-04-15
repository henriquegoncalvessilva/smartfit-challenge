import React, { startTransition } from "react";

import { useContextLocations } from "../../context/context";
import { Location, LocationData } from "../../interfaces/ILocations";

export type HOUR_INDEXES = "morning" | "afternoon" | "night";

const OPENING_HOURS = {
    morning: {
        first: "06",
        last: "12",
    },
    afternoon: {
        first: "12",
        last: "18",
    },
    night: {
        first: "18",
        last: "23",
    },
};

const Form = () => {
    const {
        filteredDataInfo,
        radioButtonValue,
        setFilteredDataInfo,
        checkbox,
        dataInfoOriginal,
        setRadioButtonValue,
        setCheckbox,
    } = useContextLocations();

    function filterLocationsByPeriodAndStatus(
        locations: Location[],
        period: string,
        showAll: boolean
    ): Location[] {
        return locations.filter((location) => {
            const isInPeriod = filterByPeriodAndOpened(location, period);
            return showAll ? isInPeriod : isInPeriod && location.opened;
        });
    }

    function filterByPeriodAndOpened(location: Location, period: string) {
        const { first, last } = OPENING_HOURS[period as HOUR_INDEXES];

        return location.schedules?.some((schedule) => {
            if (schedule.hour === "Fechada") return false;

            const [startHourStr, endHourStr] = schedule.hour.split(" às ");
            const startHour = parseInt(startHourStr.replace("h", ""));
            const endHour = parseInt(endHourStr.replace("h", ""));

            const isValid =
                endHour > parseInt(first) && startHour < parseInt(last);
            return isValid;
        });
    }

    function filterByPeriod(
        period: string,
        includeClosed: boolean
    ): LocationData | null {
        if (!dataInfoOriginal) return null;

        const filtered = filterLocationsByPeriodAndStatus(
            dataInfoOriginal.locations,
            period,
            includeClosed
        );

        if (filtered.length === 0) {
            console.log("Nenhuma unidade encontrada para o filtro atual.");
            return null;
        }

        return {
            ...dataInfoOriginal,
            locations: filtered,
        };
    }

    function handleSubmit() {
        startTransition(() => {
            if (radioButtonValue && filteredDataInfo) {
                setFilteredDataInfo(filterByPeriod(radioButtonValue, checkbox));
            } else {
                setFilteredDataInfo(dataInfoOriginal);
            }
        });
    }

    function clearForm() {
        startTransition(() => {
            setCheckbox(true);
            setRadioButtonValue("");
        });
    }

    return (
        <>
            <form
                className="border-gray-400 border-1 p-3"
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="flex justify-left items-center gap-1">
                    <img src="https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/icon-hour.png?raw=true" className="w-4" alt="" />
                    <small>Horário</small>
                </div>
                <h3 className="mt-4">Qual período treinar?</h3>
                <div className="flex flex-col gap-1">
                    <hr className="border-gray-300" />
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center flex-row-reverse">
                            <label htmlFor="morning">Manhã</label>
                            <input
                                type="radio"
                                name="period"
                                id="morning"
                                checked={radioButtonValue === "morning"}
                                onChange={(e) =>
                                    startTransition(() => {
                                        setRadioButtonValue(
                                            e.currentTarget.value
                                        );
                                    })
                                }
                                value="morning"
                            />
                        </div>
                        <span>06:00 às 12:00</span>
                    </div>
                    <hr className="border-gray-300" />

                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center flex-row-reverse">
                            <label htmlFor="afternoon">Tarde</label>
                            <input
                                type="radio"
                                name="period"
                                id="afternoon"
                                checked={radioButtonValue === "afternoon"}
                                onChange={(e) =>
                                    startTransition(() => {
                                        setRadioButtonValue(
                                            e.currentTarget.value
                                        );
                                    })
                                }
                                value="afternoon"
                            />
                        </div>
                        <span>12:00 às 18:00</span>
                    </div>
                    <hr className="border-gray-300" />

                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center flex-row-reverse">
                            <label htmlFor="night">Noite</label>
                            <input
                                checked={radioButtonValue === "night"}
                                onChange={(e) =>
                                    startTransition(() => {
                                        setRadioButtonValue(
                                            e.currentTarget.value
                                        );
                                    })
                                }
                                type="radio"
                                name="period"
                                id="night"
                                value="night"
                            />
                        </div>
                        <span>18:00 às 22:00</span>
                    </div>
                    <hr className="border-gray-300" />
                </div>
                <div className="max-mobile:flex-col max-mobile:gap-6 max-mobile:items-center flex flex-row justify-between items-start mt-6">
                    <div className="flex flex-row-reverse gap-2">
                        <label htmlFor="showError">
                            Exibir unidades fechadas
                        </label>
                        <input
                            checked={checkbox}
                            onChange={(e) => {
                                startTransition(() => {
                                    setCheckbox(e.currentTarget.checked);
                                });
                            }}
                            type="checkbox"
                            name="showError"
                            id="showError"
                        />
                    </div>
                    <p>
                        Resultados encontrados:{" "}
                        <strong>{filteredDataInfo?.locations.length}</strong>
                    </p>
                </div>
                <div className="max-mobile:flex-col flex flex-row w-full gap-2 justify-center mt-4">
                    <button
                        className="bg-amber-400 font-bold p-2 pl-12 pr-12 text-sm cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Encontrar unidade
                    </button>
                    <button
                        className="bg-white border-2 border-gray-200 font-bold p-2 pl-12 pr-12 text-sm cursor-pointer"
                        onClick={clearForm}
                    >
                        Limpar filtros
                    </button>
                </div>
            </form>
        </>
    );
};

export default React.memo(Form);
