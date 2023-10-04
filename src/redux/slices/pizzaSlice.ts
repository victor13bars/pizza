import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios/index";

export interface PizzaType {
    id: number
    imageUrl: string
    title: string
    types: Array<number>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}

const initialState = {
    items: [],
    status: 'loading'
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload

        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        },
    }
})

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params) => {
    const {order, sortBy, category, search, currentPage} = params
    const {data} = await axios.get(
        `https://64faf547cb9c00518f7a6c61.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
})

export const selectPizzaData = (state) => state.pizza

export const {
    setItems
} = pizzaSlice.actions

export default pizzaSlice.reducer
