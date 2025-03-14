import bcrypt from 'bcrypt'
import type { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { z } from 'zod'
import { multerConfig } from '../config/multer'
import { prisma } from '../lib/prisma'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyUserRole } from '../middlewares/verify-user-role'

export async function alunoRoutes(app: FastifyInstance) {
  // Parte responsável por verificar se está logado (fornece o token) e se é Personal
  app.addHook('onRequest', verifyJWT)
  app.addHook('onRequest', verifyUserRole('PERSONAL'))

  app.get('/alunos', async (request, reply) => {
    const alunos = await prisma.user.findMany({
      where: {
        role: 'ALUNO',
      },
      include: {
        UserTreino: true
      }
    })

    return reply.status(200).send({ alunos })
  })

  app.post(
    '/alunos',
    { preHandler: multer(multerConfig).single('file') },
    async (request, reply) => {
      const uploadImage = request.file as any // Get the file from the request

      const createAlunoBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string(),
        city: z.string(),
        state: z.string(),
      })

      const fields = createAlunoBodySchema.parse(request.body)

      const existingUser = await prisma.user.findUnique({
        where: { email: fields.email },
      })

      if (existingUser) {
        return reply.status(409).send({ error: 'Email já existe' })
      }

      const hashedPassword = await bcrypt.hash(fields.password, 10)

      const aluno = await prisma.user.create({
        data: {
          ...fields,
          imageUrl: uploadImage.filename || 'user_null.png' ,
          password: hashedPassword,
          role: 'ALUNO',
        },
      })

      if (!aluno) {
        return reply.status(400).send({ error: 'Erro ao criar aluno' })
      }

      return reply.status(201).send({
        ...aluno,
        password: undefined,
      })
    }
  )


  app.put('/alunos/:id', { preHandler: multer(multerConfig).single('file') }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const uploadImage = request.file as any;
  
      const updateAlunoBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
        phone: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
      });
  
      const fields = updateAlunoBodySchema.parse(request.body);
  
      const aluno = await prisma.user.findUnique({
        where: { id },
        include: {
          UserTreino: true
        }
      })
  
      if (!aluno) {
        return reply.status(404).send({ error: 'Aluno não encontrado' });
      }
  
      if (fields.email && fields.email !== aluno.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: fields.email },
        });
        if (existingUser) {
          return reply.status(409).send({ error: 'Email já existe' });
        }
      }
  
      if (fields.password) {
        fields.password = await bcrypt.hash(fields.password, 10);
      }
  
      const updatedAluno = await prisma.user.update({
        where: { id },
        data: {
          ...fields,
          imageUrl: uploadImage?.filename || aluno.imageUrl,
        },
      });
  
      return reply.status(200).send({
        ...updatedAluno,
        password: undefined,
      });
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      return reply.status(500).send({ error: 'Erro interno ao atualizar aluno' });
    }
  });
  

  app.delete('/alunos/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
  
      // Verifica se o aluno existe
      const aluno = await prisma.user.findUnique({
        where: { id },
      })
  
      if (!aluno) {
        return reply.status(404).send({ error: 'Aluno não encontrado' })
      }
  
      // Deleta o aluno
      await prisma.user.delete({
        where: { id },
      })
  
      return reply.status(200).send({ message: 'Aluno deletado com sucesso' })
    } catch (error) {
      console.error('Erro ao deletar aluno:', error)
      return reply.status(500).send({ error: 'Erro interno ao deletar aluno' })
    }
  })
}
