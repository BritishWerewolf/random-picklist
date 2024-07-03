type Item = {
    id: number;
    name: string;
    weight: number;
};

type List = {
    id: number;
    name: string;
    items: Array<Item>;
};
