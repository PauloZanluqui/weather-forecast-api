import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function favoriteCitiesRoutes(app: FastifyInstance) {
    app.addHook("onRequest", async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            reply.status(401).send({ error: "Unauthorized" });
        }
    });

    //Adicionar cidades aos favoritos
    app.post("/favoritecity", async (request, reply) => {
        const createFavoriteCityBodySchema = z.object({
            name: z.string().min(1),
        });

        const { name } = createFavoriteCityBodySchema.parse(request.body);

        const userWithSameCity = await prisma.favoriteCity.findFirst({
            where: {
                name,
                userId: Number(request.user.sub),
            },
        });

        if (userWithSameCity) {
            return reply.status(409).send({ error: "User already favorite this city" });
        }

        await prisma.favoriteCity.create({
            data: {
                name,
                userId: Number(request.user.sub),
            },
        });

        return reply.status(201).send();
    });

    //Buscar cidades favoritas
    app.get("/favoritecity", async (request, reply) => {
        const favoriteCities = await prisma.favoriteCity.findMany({
            where: {
                userId: Number(request.user.sub),
            },
        });

        return reply.send(favoriteCities);
    });

    //Remover cidades dos favoritos
    app.delete("/favoritecity/:id", async (request, reply) => {
        const deleteFavoriteCityParamsSchema = z.object({
            id: z.coerce.number(),
        });

        const { id } = deleteFavoriteCityParamsSchema.parse(request.params);

        const city = await prisma.favoriteCity.delete({
            where: {
                userId: Number(request.user.sub),
                id,
            },
        });

        if (!city) {
            return reply.status(404).send({ error: "City not found" });
        }

        return reply.status(204).send();
    });
}
