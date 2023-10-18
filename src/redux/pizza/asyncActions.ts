import {createAsyncThunk} from "@reduxjs/toolkit";
import {PizzaType, SearchPizzaType} from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<PizzaType[], SearchPizzaType>(
    'pizza/fetchPizzas',
    async (params) => {
        const {order, sortBy, category, search, currentPage} = params
        const {data} = await axios.get<PizzaType[]>(
            `https://64faf547cb9c00518f7a6c61.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data
    })
