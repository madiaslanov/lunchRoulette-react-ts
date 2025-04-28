import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {FilterParams} from "./sideBarType.ts";
import {getFiltredRestaurantApi} from "../api";
import {RestaurantType} from "../../card/model/cardTypes.ts";

const initialState = {
    restaurants: [] as RestaurantType[],
}


export const getFiltredRestaurant = createAsyncThunk<
    RestaurantType[],
    FilterParams,
    { rejectValue: string }
>(
    'restaurants/getFiltredRestaurants',
    async (filters: FilterParams, { rejectWithValue }) => {
        try {
            const response = await getFiltredRestaurantApi(filters);

            if (response.length > 0) {
                return response;
            }

            return rejectWithValue('Ничего не найдено по заданным фильтрам');
        } catch (err) {
            return rejectWithValue('Ошибка при получении данных');
        }
    }
);


const sideBarSlice = createSlice({
    name: "sideBar",
    initialState,
    reducers: {
    },
    extraReducers: builder => (
        builder
            .addCase(getFiltredRestaurant.fulfilled, (state, action)=> {
                state.restaurants = action.payload;
            } )
    )
})

export default sideBarSlice.reducer;