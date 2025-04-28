import {PlacesType, RestaurantType} from "../model/cardTypes.ts";
import {baseURL} from "../../../service/baseApi";

export const getRestaurantApi = async (): Promise<PlacesType[]> => {
    const response = await fetch(`${baseURL}/places`);
    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }
    const data = await response.json();
    return data.places;
};


export const getRestaurantByRatingApi = async (): Promise<PlacesType[]> => {
    const response = await fetch(`${baseURL}/places/rating?sort=rating&order=desc`);
    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }
    const data = await response.json();
    return data;
};


export const getRestaurantByIdApi = async (id: number): Promise<RestaurantType> => {
    const response = await fetch(`${baseURL}/restaurant/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }
    const data = await response.json();
    return data;
}