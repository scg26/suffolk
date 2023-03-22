import { Product } from "./product";

export interface Products{
        products: Product[];
        total: number;
        skip: number;
        limit: number;
    }
