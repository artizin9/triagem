import type { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { z } from 'zod'
import { multerConfig } from '../config/multer'
import { prisma } from '../lib/prisma'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyUserRole } from '../middlewares/verify-user-role'

export async function treinosRoutes(app: FastifyInstance) {
  // Parte responsável por verificar se está logado (pelo o token) e se é Personal
  app.addHook('onRequest', verifyJWT)
  app.addHook('onRequest', verifyUserRole('PERSONAL'))

  app.get('/treinos', async (request, reply) => {
    const treinos = await prisma.treino.findMany({
      include: {
        exercicios: true
      }
    })

    return reply.send({ treinos })
  })

  app.get('/treinos/:id', async (request, reply) => {
    const getTreinoParamsSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = getTreinoParamsSchema.parse(request.params)

    const treino = await prisma.treino.findUnique({
      where: { id },
      include: {
        exercicios: true
      }
    })

    if (!treino) {
      return reply.status(404).send({ error: 'Treino não encontrado' })
    }

    return reply.send({ treino })
  })

  app.post(
    '/treinos',
    { preHandler: multer(multerConfig).single('file') },
    async (request, reply) => {
      const uploadImage = request.file as any

      const createTreinoBodySchema = z.object({
        name: z.string(),
        conclusionTime: z.string(),
        levelTraining: z.string(),
        weekDay: z.string(),
      })

      const { name, conclusionTime, levelTraining, weekDay } =
        createTreinoBodySchema.parse(request.body)

      const treino = await prisma.treino.create({
        data: {
          name,
          imageUrl: uploadImage.filename || 'noPhoto.png',
          conclusionTime,
          levelTraining,
          weekDay,
        },
      })

      return reply.status(201).send({ treino })
    }
  )

  app.put(
    '/treinos/:id/update',
    { preHandler: multer(multerConfig).single('file') },
    async (request, reply) => {
      const uploadImage = request.file as any

      const updateTreinoParams = z.object({
        id: z.string().cuid(),
      })

      const updateTreinoBodySchema = z.object({
        name: z.string().optional(),
        conclusionTime: z.string().optional(),
        levelTraining: z.string().optional(),
        weekDay: z.string().optional(),
      })

      const { id } = updateTreinoParams.parse(request.params)
      const { name, conclusionTime, levelTraining, weekDay } =
        updateTreinoBodySchema.parse(request.body)

      // TODO: Aqui deveria ter uma validação, caso houver imagem para atualizar, deve apagar a antiga

      const treino = await prisma.treino.update({
        where: { id },
        data: {
          name,
          conclusionTime,
          levelTraining,
          weekDay,
          imageUrl: uploadImage.filename,
        },
      })

      return reply.send({ treino })
    }
  )

  app.delete('/treinos/:id/delete', async (request, reply) => {
    const deleteTreinoParams = z.object({
      id: z.string().cuid(),
    })

    const { id } = deleteTreinoParams.parse(request.params)

    const existingTreino = await prisma.treino.findUnique({ where: { id } })

    if (!existingTreino) {
      return reply.status(404).send({ error: 'Treino não encontrado' })
    }

    await prisma.treino.delete({
      where: { id },
    })

    return reply.status(200).send({ message: 'Treino deletado com sucesso!' })
  })
}
