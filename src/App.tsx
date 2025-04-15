import React, { lazy, Suspense } from "react";
import "./App.css";
const ListItem = lazy(() => import("./components/listItem"));
const Form = lazy(() => import("./components/form"));
import { useContextLocations } from "./context/context";

function App() {
    const { filteredDataInfo } = useContextLocations();

    return (
        <>
            <header className="w-full bg-black p-4 flex items-center justify-center">
                <img
                    className="block w-full max-w-32"
                    src="https://raw.githubusercontent.com/FelipeSantanaa/smartfit-test/7cd8cae530164e32e77ca6a357ced3ad35a00c54/material/_material/images/logo.svg"
                    alt="logo"
                />
            </header>

            <section
                role="main"
                className="flex  flex-col justify-center items-left w-2.5xl max-w-4xl m-auto px-2 py-4 gap-y-10"
            >
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl max-w-2xs text-left text font-bold ">
                        REABERTURA SMART FIT
                    </h1>
                    <div className="max-w-20  bg-black h-1.5" />
                    <p>
                        O horário de funcionamento das nossas unidades está
                        seguindo os decretos de cada município. Por isso,
                        confira aqui se a sua unidade está aberta e as medidas
                        de segurança que estamos seguindo.
                    </p>
                    <Suspense fallback={"Carregando..."}>
                        <Form />
                    </Suspense>
                </div>
               

                <section className="justify-center flex flex-column w-full flex-wrap gap-x-10 gap-y-10 max-tablet:justify-around tablet:gap-x-6  desktop:justify-between">
                    {filteredDataInfo?.locations.length === 0 ? (
                        "Nenhum dos dados foram encontrados"
                    ) : (
                        <Suspense fallback={"Carregando..."}>
                            <ListItem />
                        </Suspense>
                    )}
                </section>
            </section>
            <footer className="w-full bg-stone-800 max-px-96 py-12 flex items-center justify-center flex-col gap-4">
                <img
                    className="block w-full max-w-28"
                    src="https://raw.githubusercontent.com/FelipeSantanaa/smartfit-test/7cd8cae530164e32e77ca6a357ced3ad35a00c54/material/_material/images/logo.svg"
                    alt="logo"
                />
                <p className="text-white">
                    Todos os direitos reservados - 2020
                </p>
            </footer>
        </>
    );
}

export default React.memo(App);
