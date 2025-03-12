import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyUserRole } from '../middlewares/verify-user-role'

export async function treinoAlunosRoutes(app: FastifyInstance) {
  // Parte responsável por verificar se está logado (pelo o token) e se é Personal
  app.addHook('onRequest', verifyJWT)
  app.addHook('onRequest', verifyUserRole('PERSONAL'))

  app.get('/alunos/:idAluno/exercicios', async (request, reply) => {
    const idAlunoParams = z.object({
      idAluno: z.string().cuid(),
    })

    const { idAluno } = idAlunoParams.parse(request.params)

    const exerciciosAluno = await prisma.userTreino.findMany({
      where: {
        userId: idAluno,
      },
      include: {
        treino: {
          select: {
            exercicios: true,
          },
        },
      },
    })

    return reply.send({ exerciciosAluno })
  })

  app.get('/alunos/:idAluno/treinos', async (request, reply) => {
    const idAlunoParams = z.object({
      idAluno: z.string().cuid(),
    })

    const { idAluno } = idAlunoParams.parse(request.params)

    const TrainingAluno = await prisma.userTreino.findMany({
      where: {
        userId: idAluno,
      },
      include: {
        treino: true,
      },
    })

    return reply.send({ TrainingAluno })
})

  app.post(
    '/alunos/:idAluno/treinos/:idTreino/associate',
    async (request, reply) => {
      const associateTreinoAlunoParams = z.object({
        idAluno: z.string().cuid(),
        idTreino: z.string().cuid(),
      })

      const { idAluno, idTreino } = associateTreinoAlunoParams.parse(
        request.params
      )

      const existingAssociation = await prisma.userTreino.findFirst({
        where: {
          treinoId: idTreino,
          userId: idAluno,
        },
      })

      if (existingAssociation) {
        return reply
          .status(409)
          .send({ error: 'O aluno já possui este treino' })
      }

      const alunoTreino = await prisma.userTreino.create({
        data: {
          userId: idAluno,
          treinoId: idTreino,
        },
      })

      return reply.status(201).send({ alunoTreino })
    }
  )

  app.delete(
    '/alunos/:idAluno/treinos/:idTreino/disassociate',
    async (request, reply) => {
      const disassociateTreinoAlunoParams = z.object({
        idAluno: z.string().cuid(),
        idTreino: z.string().cuid(),
      })

      const { idAluno, idTreino } = disassociateTreinoAlunoParams.parse(
        request.params
      )

      const alunoTreino = await prisma.userTreino.findFirst({
        where: {
          treinoId: idTreino,
          userId: idAluno,
        },
      })

      if (!alunoTreino) {
        return reply.status(404).send({ error: 'Associação não encontrada' })
      }

      await prisma.userTreino.delete({
        where: {
          id: alunoTreino.id,
        },
      })

      return reply.status(200).send({ message: 'Treino desassociado ao aluno' })
    }
  )
}
