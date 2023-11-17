import {getCartFromLS} from "../../utils/getCartFromLS";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {CartItemType, CartStateType} from "./types";

const {totalPrice, items} = getCartFromLS()

const initialState: CartStateType = {
    totalPrice,
    items
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItemType>) => {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find((obj) => obj.id === action.payload)

            if (findItem) {
                findItem.count--
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems: (state,) => {
            state.items = []
            state.totalPrice = 0
        },
    },
})
export const {
    minusItem,
    addItem,
    removeItem,
    clearItems,
} = cartSlice.actions

export default cartSlice.reducer
