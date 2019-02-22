export interface CheckoutItem{
    name: string;
    id: string;
    price: number;
    count: number;
    sum: number
}

export interface Order{
    id?:string;
    name: string;
    email: string;
    phone: string;
    status: string;
    items: CheckoutItem[];
    total: number;
}