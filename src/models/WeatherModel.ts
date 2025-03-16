export interface Weather {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
    };
    current: {
        last_updated: string;
        temp_c: number;
        is_day: number;
        condition: {
            text: string;
            icon: string;
        };
    };
    forecast: {
        forecastday: ForecastDay[];
    };
}

export interface ForecastDay {
    date: string;
    date_epoch: number;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        maxwind_mph: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        totalprecip_in: number;
        avgvis_km: number;
        avgvis_miles: number;
        avghumidity: number;
        daily_will_it_rain: number;
        daily_chance_of_rain: number;
        condition: {
            text: string;
            icon: string;
        };
        uv: number;
    };
    hour: HourlyForecast[];
}

export interface HourlyForecast {
    time: string;
    temp_c: number;
    is_day: number;
    condition: {
        text: string;
        icon: string;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    windchill_c: number;
    heatindex_c: number;
    dewpoint_c: number;
    will_it_rain: number;
    chance_of_rain: number;
    uv: number;
}