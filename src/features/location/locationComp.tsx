import React, { useState } from 'react';
import style from './location.module.css';

interface LocationPickerProps {
    onLocationChange: (lat: number | null, lon: number | null) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationChange }) => {
    const [location, setLocation] = useState<{ latitude: number | null, longitude: number | null }>({
        latitude: null,
        longitude: null,
    });

    const getUserLocation = (e: React.MouseEvent) => {
        e.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    onLocationChange(latitude, longitude);
                },
                (error) => {
                    console.error("Ошибка получения местоположения: ", error);
                    alert("Не удалось получить местоположение.");
                }
            );
        } else {
            alert("Geolocation не поддерживается вашим браузером.");
        }
    };

    return (
        <div className={style.location}>
            <button onClick={getUserLocation}>Получить местоположение</button>

            <div>
                <p>Широта: {location.latitude}</p>
                <p>Долгота: {location.longitude}</p>
            </div>
        </div>
    );
};

export default LocationPicker;
