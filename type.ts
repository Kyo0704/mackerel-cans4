// types.ts

export type ProductType = {
    pid: string;
    pname: string;
    expiry_date: Date | null;
    price: number | null;
    image: string | null;
    gid: string;
    production_area: string | null;
    volume: string | null;
    discounts: DiscountType[];
    // 他の属性も必要に応じてここに追加します。
};

export type DiscountType = {
    pid: string;
    sid: string;
    stid: string;
    cid: string;
    // 他の属性も必要に応じて追加する
};
