
import React, { useEffect, useState, useRef } from 'react';

interface ForecastDay {
    date: string;
    maxTemp: number;
    minTemp: number;
    icon: string;
    desc: string;
}

interface WeatherData {
    temp: number;
    description: string;
    icon: string;
    city: string;
    forecast: ForecastDay[];
}

const weatherCodes: Record<number, { desc: string, icon: string }> = {
    0: { desc: 'Açık', icon: 'fa-sun' },
    1: { desc: 'Açık', icon: 'fa-cloud-sun' },
    2: { desc: 'Parçalı Bulutlu', icon: 'fa-cloud-sun' },
    3: { desc: 'Bulutlu', icon: 'fa-cloud' },
    45: { desc: 'Sisli', icon: 'fa-smog' },
    48: { desc: 'Sisli', icon: 'fa-smog' },
    51: { desc: 'Çisenti', icon: 'fa-cloud-rain' },
    61: { desc: 'Hafif Yağmurlu', icon: 'fa-cloud-showers-heavy' },
    71: { desc: 'Hafif Karlı', icon: 'fa-snowflake' },
    95: { desc: 'Fırtınalı', icon: 'fa-bolt' },
};

const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showForecast, setShowForecast] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.6772&longitude=26.5557&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto');
                const data = await res.json();

                const currentInfo = weatherCodes[data.current.weather_code] || { desc: 'Hava Durumu', icon: 'fa-cloud' };

                const forecast: ForecastDay[] = data.daily.time.slice(1, 6).map((time: string, i: number) => {
                    const dayIndex = i + 1;
                    const code = data.daily.weather_code[dayIndex];
                    const info = weatherCodes[code] || { desc: 'Bulutlu', icon: 'fa-cloud' };
                    const dateObj = new Date(time);
                    const dayName = new Intl.DateTimeFormat('tr-TR', { weekday: 'short' }).format(dateObj);

                    return {
                        date: dayName,
                        maxTemp: Math.round(data.daily.temperature_2m_max[dayIndex]),
                        minTemp: Math.round(data.daily.temperature_2m_min[dayIndex]),
                        icon: info.icon,
                        desc: info.desc
                    };
                });

                setWeather({
                    temp: Math.round(data.current.temperature_2m),
                    description: currentInfo.desc,
                    icon: currentInfo.icon,
                    city: 'Edirne',
                    forecast
                });
            } catch (error) {
                console.error('Weather fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
                setShowForecast(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (loading || !weather) return null;

    return (
        <div
            className={`weather-widget-container ${showForecast ? 'active' : ''}`}
            ref={widgetRef}
            onMouseEnter={() => setShowForecast(true)}
            onMouseLeave={() => setShowForecast(false)}
            onClick={() => setShowForecast(!showForecast)}
        >
            <div className="weather-widget">
                <div className="weather-info">
                    <i className={`fas ${weather.icon}`}></i>
                    <span className="weather-temp">{weather.temp}°C</span>
                    <span className="weather-city">{weather.city}</span>
                </div>
                <span className="weather-desc">{weather.description}</span>
            </div>

            {showForecast && (
                <div className="weather-forecast-dropdown">
                    <h4>5 Günlük Tahmin</h4>
                    <div className="forecast-list">
                        {weather.forecast.map((day, index) => (
                            <div key={index} className="forecast-item">
                                <span className="forecast-day">{day.date}</span>
                                <i className={`fas ${day.icon}`}></i>
                                <div className="forecast-temps">
                                    <span className="max">{day.maxTemp}°</span>
                                    <span className="min">{day.minTemp}°</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherWidget;
