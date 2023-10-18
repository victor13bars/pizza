export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
}

export interface SortType {
    name: string
    sortProperty: SortPropertyEnum
}

export interface FilterStateType {
    searchValue: string
    categoryId: number
    currentPage: number
    sort: SortType
}
