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
    id: string
    imageUrl: string
    title: string
    sizes: Array<number>
    types: Array<number>
    price: number
    category: number
    rating: number
}

export interface PizzaStateType {
    items: Array<PizzaType>,
    status: Status
}
