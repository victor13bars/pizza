import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios/index";
import {RootState} from "../store";

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

const initialState: PizzaStateType = {
    items: [],
    status: Status.LOADING
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
        })
    }
})

export const fetchPizzas = createAsyncThunk<PizzaType[], SearchPizzaType>(
    'pizza/fetchPizzas',
    async (params) => {
        const {order, sortBy, category, search, currentPage} = params
        const {data} = await axios.get<PizzaType[]>(
            `https://64faf547cb9c00518f7a6c61.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data
    })

export const selectPizzaData = (state: RootState) => state.pizza

export const {
    setItems
} = pizzaSlice.actions

export default pizzaSlice.reducer
