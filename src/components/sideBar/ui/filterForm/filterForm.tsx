import { useForm } from "react-hook-form";
import { Rating, Slider } from "@mui/material";
import { useState } from "react";
import style from './filterForm.module.css';
import CuisineSelect from "../../../../features/selectCusine/selectCuisine.tsx";
import { UseAppDispatch } from "../../../../service/reactHooks/hooks.ts";
import { getFiltredRestaurant } from "../../model/sideBarReducer.ts";
import LocationPicker from "../../../../features/location/locationComp.tsx";

interface Inputs {
    cuisine: string | null;
    rating: number | null;
    wait_time: number | null;
    latitude: number | null;
    longitude: number | null;
}

const FilterForm = () => {
    const { handleSubmit } = useForm<Inputs>();
    const dispatch = UseAppDispatch();
    const [cuisine, setCuisine] = useState('');
    const [rating, setRating] = useState<number | null>(null);
    const [waitTime, setWaitTime] = useState<number>(15);
    const [location, setLocation] = useState<{ latitude: number | null, longitude: number | null }>({
        latitude: null,
        longitude: null,
    });

    const onSubmit = () => {
        console.log({
            cuisine,
            rating,
            wait_time: waitTime,
            latitude: location.latitude,
            longitude: location.longitude,
        });
        dispatch(getFiltredRestaurant({
            cuisine,
            rating,
            wait_time: waitTime,
            latitude: location.latitude,
            longitude: location.longitude,
        }));
    };

    const handleLocationChange = (lat: number | null, lon: number | null) => {
        setLocation({ latitude: lat, longitude: lon });
    };


    const handleCuisineChange = (value: string | null) => {
        setCuisine(value || '');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.formHolder}>
            <CuisineSelect value={cuisine} onChange={handleCuisineChange} />

            <div className={style.formFilter}>
                <label>Rating</label>
                <Rating
                    name="half-rating"
                    precision={0.5}
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue)}
                />
            </div>

            <div className={style.formTime}>
                <label>Average wait time</label>
                <Slider
                    size="medium"
                    value={waitTime}
                    onChange={(_, newValue) => setWaitTime(newValue as number)}
                    aria-label="Время ожидания"
                    valueLabelDisplay="auto"
                    min={0}
                    max={60}
                    step={5}
                    sx={{
                        '& .MuiSlider-thumb': {
                            backgroundColor: '#933C24',
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#e0e0e0',
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: 'orange',
                        },
                    }}
                />
            </div>

            <LocationPicker onLocationChange={handleLocationChange} />

            <button type="submit" style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
                Применить фильтр
            </button>
        </form>
    );
};

export default FilterForm;
