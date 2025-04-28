import {baseURL} from "../../../service/baseApi";
import {RestaurantType} from "../../card/model/cardTypes.ts";
import {FilterParams} from "../model/sideBarType.ts";


export const getFiltredRestaurantApi = async (params: FilterParams): Promise<RestaurantType[]> => {
    try {
        const cleanedParams: Record<string, string> = {};

        if (params.cuisine) cleanedParams['cuisine'] = params.cuisine;
        if (params.rating !== null && params.rating !== undefined) cleanedParams['rating'] = params.rating.toString();
        if (params.wait_time !== null && params.wait_time !== undefined) cleanedParams['wait_time'] = params.wait_time.toString();

        if (params.latitude !== null && params.latitude !== undefined) cleanedParams['lat'] = params.latitude.toString();
        if (params.longitude !== null && params.longitude !== undefined) cleanedParams['lon'] = params.longitude.toString();

        const queryParams = new URLSearchParams(cleanedParams).toString();

        const response = await fetch(`${baseURL}/restaurants/filter?${queryParams}&range=3`);

        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();

        console.log("Отфильтрованные данные: ", data);

        return data;
    } catch (err) {
        console.error('Ошибка при запросе:', err);
        return [];
    }
};