export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type SearchPizzaType = {
    order: string
    sortBy: string
    category: string
    search: string
    currentPage: string
}

export interface PizzaType {
    id: number
    imageUrl: string
    title: string
    type: string
    size: number
    price: number
    category: number
    rating: number
}

export interface PizzaStateType {
    items: Array<PizzaType>,
    status: Status
}
