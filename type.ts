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
    // 既存のプロパティ
    originalPrice?: number;    // 値引き前の金額
    discountedPrice?: number;  // 値引き後の金額
    discountAmount?: number;   // 値引き額
    // 他の属性も必要に応じてここに追加します。
};

export type DiscountType = {
    pid: string;
    sid: string;
    stid: string;
    cid: string;
    state: state[];
    // 他の属性も必要に応じて追加する
};

export type state = {
    stid: string;
    stname: string;
}