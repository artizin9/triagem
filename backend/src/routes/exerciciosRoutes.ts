import type { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { z } from 'zod'
import { multerConfig } from '../config/multer'
import { prisma } from '../lib/prisma'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyUserRole } from '../middlewares/verify-user-role'

export async function exerciciosRoutes(app: FastifyInstance) {
  // Parte responsável por verificar se está logado (pelo o token) e se é Personal
  app.addHook('onRequest', verifyJWT)
  app.addHook('onRequest', verifyUserRole('PERSONAL'))

  app.get('/treinos/:id/exercicios', async (request, reply) => {
    const idTreinoParams = z.object({
      id: z.string().cuid(),
    })

    const { id } = idTreinoParams.parse(request.params)

    const exercicios = await prisma.exercicio.findMany({
      where: {
        treino: {
          id,
        },
      },
    })

    return reply.send({ exercicios })
  })

  app.get('/exercicios/:id', async (request, reply) => {
    const idExercicioParams = z.object({
      id: z.string().cuid(),
    })

    const { id } = idExercicioParams.parse(request.params)

    const exercicio = await prisma.exercicio.findUnique({ where: { id } })

    return reply.send({ exercicio })
  })

  app.post(
    '/treinos/:idTreino/exercicios',
    { preHandler: multer(multerConfig).single('file') },
    async (request, reply) => {
      const uploadImage = request.file as any

      const idTreinoParams = z.object({
        idTreino: z.string().cuid(),
      })

      const createExercicioBodySchema = z.object({
        description: z.string(),
        repetitions: z.string(),
        executions: z.string(),
        interval: z.string(),
      })

      const { idTreino } = idTreinoParams.parse(request.params)

      const { description, executions, interval, repetitions } =
        createExercicioBodySchema.parse(request.body)

      const exercicio = await prisma.exercicio.create({
        data: {
          description,
          executions,
          interval,
          repetitions,
          treinoId: idTreino,
          imageUrl: uploadImage.filename,
        },
      })

      return reply.status(201).send({ exercicio })
    }
  )

  app.put(
    '/exercicios/:id/update',
    { preHandler: multer(multerConfig).single('file') },
    async (request, reply) => {
      const uploadImage = request.file as any

      const updateExercicioParams = z.object({
        id: z.string().cuid(),
      })

      const updateExercicioBodySchema = z.object({
        description: z.string().optional(),
        repetitions: z.string().optional(),
        executions: z.string().optional(),
        interval: z.string().optional(),
      })

      const { id } = updateExercicioParams.parse(request.params)
      const { description, repetitions, executions, interval } =
        updateExercicioBodySchema.parse(request.body)

      const exercicio = await prisma.exercicio.update({
        where: { id },
        data: {
          description,
          repetitions,
          executions,
          interval,
          imageUrl: uploadImage.filename,
        },
      })

      return reply.send({ exercicio })
    }
  )

  app.delete('/exercicios/:id/delete', async (request, reply) => {
    const deleteExercicioParams = z.object({
      id: z.string().cuid(),
    })

    const { id } = deleteExercicioParams.parse(request.params)

    const existingExercicio = await prisma.exercicio.findUnique({
      where: { id },
    })

    if (!existingExercicio) {
      return reply.status(404).send({ error: 'Exercício não encontrado' })
    }

    await prisma.exercicio.delete({
      where: { id },
    })

    return reply
      .status(200)
      .send({ message: 'Exercício deletado com sucesso!' })
  })
}
