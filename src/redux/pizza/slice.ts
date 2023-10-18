import {createSlice} from '@reduxjs/toolkit'
import {PizzaStateType, Status} from "./types";
import {fetchPizzas} from "./asyncActions";


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

export const {
    setItems
} = pizzaSlice.actions

export default pizzaSlice.reducer
