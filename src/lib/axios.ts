import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const api = axios.create({
    baseURL: `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}`,
    params: {
        lang: "PT"
    }
});
