export interface CartStateType {
    totalPrice: number
    items: Array<CartItemType>
}

export interface CartItemType {
    id: string;
    title: string;
    type: string;
    size: number;
    price: number;
    count: number;
    imageUrl: string;
}
