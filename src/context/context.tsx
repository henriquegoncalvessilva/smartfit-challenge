// CounterContext.tsx
import axios from "axios";
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { LocationData } from "../interfaces/ILocations";


type ContextType = {
    checkbox: boolean;
    setCheckbox: React.Dispatch<React.SetStateAction<boolean>>;

    radioButtonValue: string;
    setRadioButtonValue: React.Dispatch<React.SetStateAction<string>>;

    dataInfoOriginal: LocationData | null | undefined;
    setDataInfoOriginal: React.Dispatch<
        React.SetStateAction<LocationData | null | undefined>
    >;

    filteredDataInfo: LocationData | null | undefined;
    setFilteredDataInfo: React.Dispatch<
        React.SetStateAction<LocationData | null | undefined>
    >;
};

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [dataInfoOriginal, setDataInfoOriginal] =
        useState<LocationData | null>();
    const [filteredDataInfo, setFilteredDataInfo] =
        useState<LocationData | null>();
    const [checkbox, setCheckbox] = useState(true);
    const [radioButtonValue, setRadioButtonValue] = useState("");
    const URL =
        "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(URL);
                setDataInfoOriginal(response.data);
                setFilteredDataInfo(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    

    return (
        <Context.Provider
            value={{
                checkbox,
                radioButtonValue,
                setCheckbox,
                dataInfoOriginal,
                filteredDataInfo,
                setDataInfoOriginal,
                setFilteredDataInfo,
                setRadioButtonValue,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useContextLocations = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error(
            "useCounter deve ser usado dentro de um CounterProvider"
        );
    }
    return context;
};
