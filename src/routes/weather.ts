import { FastifyInstance } from "fastify";
import { z } from "zod";
import { api } from "../lib/axios";

export async function weatherRoutes(app: FastifyInstance) {
    app.addHook("onRequest", async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            reply.status(401).send({ error: "Unauthorized" });
        }
    });

    //Buscar tempo por cidade
    app.get("/weather/:cityName", async (request, reply) => {
        const getWeatherParamsSchema = z.object({
            cityName: z.string(),
        });
        
        const { cityName } = getWeatherParamsSchema.parse(request.params);

        const weather = await api.get("", {params: {q: cityName}});

        reply.status(200).send(weather.data)
    });

    //Buscar previsões para 5 dias
    app.get("/weather/nextdays/:cityName", async (request, reply) => {
        const getWeatherParamsSchema = z.object({
            cityName: z.string(),
        });
        
        const { cityName } = getWeatherParamsSchema.parse(request.params);

        const weather = await api.get("", {params: {q: cityName, days: 5}});

        reply.status(200).send(weather.data)
    });
}
