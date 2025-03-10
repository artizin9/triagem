import { PrismaClient } from '@prisma/client'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'

const prisma = new PrismaClient()

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Definindo esquema de validação para evitar dados inválidos
      const querySchema = z.object({
        name: z.string().min(1).max(50).optional(),
        email: z.string().email().optional(),
        page: z.string().optional(),
        limit: z.string().optional(),
      })

      // Faz a validação da query string
      const parsedQuery = querySchema.safeParse(request.query)
      if (!parsedQuery.success) {
        return reply.code(400).send({ message: 'Parâmetros inválidos!' })
      }

      // Desestruturação com valores validados
      const { name, email, page, limit } = parsedQuery.data

      // Paginação
      const pageNumber = Number(page) || 1
      const pageSize = Math.min(Number(limit) || 10, 50) // Máx. 50 resultados por requisição

      // Criando filtros dinâmicos
      type FilterType = {
        name?: {
          contains: string
        }
        email?: {
          contains: string
        }
      }

      const filters: FilterType = {}
      if (name) filters.name = { contains: name }
      if (email) filters.email = { contains: email }

      // Busca os usuários com paginação
      const users = await prisma.user.findMany({
        where: filters,
        select: {
          id: true,
          name: true,
          email: true,
        },
        take: pageSize,
        skip: (pageNumber - 1) * pageSize,
      })

      if (users.length === 0) {
        return reply.code(404).send({ message: 'Nenhum usuário encontrado' })
      }

      return reply.code(200).send(users)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      return reply.status(500).send({ message: 'Erro ao buscar usuários' })
    }
  })

  // Rota para obter os dados do usuário autenticado
  app.get('/me', { preHandler: verifyJWT }, async (request, reply) => {
    const user = await prisma.user.findUnique({
      where: { id: request.user.sub },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return reply.send({ user })
  })
}
