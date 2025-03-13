import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function weatherRoutes(app: FastifyInstance) {
	//Buscar tempo por cidade
    //Buscar previsões para 5 dias
}