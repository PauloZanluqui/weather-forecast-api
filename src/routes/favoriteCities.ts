import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function favoriteCitiesRoutes(app: FastifyInstance) {
    //Adicionar cidades aos favoritos
    //Remover cidades dos favoritos
    //Buscar cidades favoritas
}