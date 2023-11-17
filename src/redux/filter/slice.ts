import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterStateType, SortPropertyEnum, SortType} from "./types";

const initialState: FilterStateType = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.currentPage = 1
            state.searchValue = action.payload
        },
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.currentPage = 1
            state.categoryId = action.payload
        },
        setSort: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action: PayloadAction<FilterStateType>) => {
            state.sort = action.payload.sort
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
        },
    },
})
export const {
    setSearchValue,
    setFilters,
    setCategoryId,
    setSort,
    setCurrentPage
} = filterSlice.actions

export default filterSlice.reducer
