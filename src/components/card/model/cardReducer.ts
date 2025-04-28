import {PlacesType, RestaurantType} from "./cardTypes.ts";
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getRestaurantApi, getRestaurantByIdApi, getRestaurantByRatingApi} from "../api";

const initialState = {
    places: [] as PlacesType[],
    placesByRating: [] as PlacesType[],
    restaurant : {} as RestaurantType,
};

export const getRestaurant = createAsyncThunk<PlacesType[], void, { rejectValue: string }>(
    'places/getRestaurant',
    async (_, {rejectWithValue}) => {
        try {
            const data = await getRestaurantApi();

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown Error');
        }
    }
);

export const getRestaurantByRating = createAsyncThunk<PlacesType[], void, { rejectValue: string }>(
    'places/getRestaurantByRating',
    async (_, {rejectWithValue}) => {
        try {
            const data = await getRestaurantByRatingApi();

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown Error');
        }
    }
);

export const getRestaurantById = createAsyncThunk<RestaurantType, number, { rejectValue: string }>(
    'places/getRestaurantById',
    async (id, { rejectWithValue }) => {
        try {
            const data = await getRestaurantByIdApi(id);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown Error');
        }
    }
);


const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRestaurant.fulfilled, (state, action) => {
                state.places = action.payload;
            })
            .addCase(getRestaurant.rejected, (action) => {
                console.error('Failed to fetch places:', action);
            })
            .addCase(getRestaurantByRating.fulfilled, (state, action) => {
                state.placesByRating = action.payload;
            })
            .addCase(getRestaurantByRating.rejected, (action) => {
                console.error('Failed to fetch places:', action);
            })
            .addCase(getRestaurantById.fulfilled, (state, action) => {
                state.restaurant = action.payload;
            })
            .addCase(getRestaurantById.rejected, ( action) => {
                console.error('Failed to fetch restaurant by ID:', action);
            });
    }
})

export default cardSlice.reducer;