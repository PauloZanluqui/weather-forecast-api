import fastify from "fastify";
import { ZodError } from "zod";
import cors from "@fastify/cors";
import { weatherRoutes } from "./routes/weather";
import fastifyJwt from "@fastify/jwt";
import { authenticationRoutes } from "./routes/authentication";
import { favoriteCitiesRoutes } from "./routes/favoriteCities";

const app = fastify();

app.register(fastifyJwt, {
    secret: "ChaveSecreta12345Ç",
});

app.register(cors, {
    origin: "*",
});

app.register(weatherRoutes);
app.register(authenticationRoutes);
app.register(favoriteCitiesRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "Validation error.", issues: error.format() });
    }

    console.error(error);

    return reply.status(500).send({ message: "Internal server error." });
});

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server running!");
});
