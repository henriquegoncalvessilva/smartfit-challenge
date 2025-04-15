
type ItemImagesProps = {
    mask: string;
    towel: string;
    fountain: string;
    locker_room: string;
};

type FountainStatus = "partial" | "forbidden";

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
const fountainMap: Record<FountainStatus, string> = {
    partial: "partial-fountain.png",
    forbidden: "forbidden-fountain.png",
};
function getLockerRoom(status: string) {
    switch (status) {
        case "not_allowed":
            return "https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/forbidden-lockerroom.png?raw=true";

        default:
            return "https://github.com/FelipeSantanaa/smartfit-test/blob/main/material/_material/images/required-lockerroom.png?raw=true";
    }
}

const ItemImages = ({
    mask,
    towel,
    fountain,
    locker_room,
}: ItemImagesProps) => {
    return (
        <section className="flex flex-row gap-1">
            <img
                className="w-12 h-12"
                src={getIconMask(mask)}
                alt="icone máscara"
            />

            <img
                className="w-12 h-12"
                src={getTowel(towel)}
                alt="icone toalha"
            />
            <img
                className="w-12 h-12"
                src={getFountainImageUrl(fountain as FountainStatus)}
                alt="icone bebedouro"
            />

            <img
                className="w-12 h-12"
                src={getLockerRoom(locker_room)}
                alt="icone vestiário"
            />
        </section>
    );
};

export default ItemImages;
