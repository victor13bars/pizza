import {createSlice} from '@reduxjs/toolkit'

export interface SortType {
    name: string
    sortProperty: string
}

export interface FilterType {
    searchValue: string
    categoryId: number
    currentPage: number
    sort: SortType
}

const initialState: FilterType = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setSort: (state, action) => {
            state.sort = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action) => {
            state.sort = action.payload.sort
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
        },
    },
})

export const selectSort = (state) => state.filter.sort
export const selectFilter = (state) => state.filter
export const {
    setSearchValue,
    setFilters,
    setCategoryId,
    setSort,
    setCurrentPage
} = filterSlice.actions

export default filterSlice.reducer
