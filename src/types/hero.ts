export interface Hero {
    ename: number;
    cname: string;
    title: string;
    iconUrl: string;
}

export interface HeroResponse {
    code: number;
    data: Hero[];
}

export interface HeroPower {
    name: string;
    platform: string;
    areaPower: string;
    cityPower: string;
    provincePower: string;
    guobiao: string;
    updatetime: string;
}

export interface HeroPowerResponse {
    code: number;
    data: HeroPower;
    msg: string;
} 