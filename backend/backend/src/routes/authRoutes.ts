import bcrypt from 'bcrypt'
import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function authRoutes(app: FastifyInstance) {
  // Rota de registro
  app.post('/register', async (request, reply) => {
    const registerUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })

    const { name, email, password } = registerUserBodySchema.parse(request.body)

    // Verificar se o email já existe ainda de criar o usuário
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return reply.status(409).send({ error: 'Email já existe' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'PERSONAL',
      },
    })

    return reply.status(201).send({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  })

  // Rota de login
  app.post('/login', async (request, reply) => {
    const loginBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = loginBodySchema.parse(request.body)

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user)
      return reply
        .status(400)
        .send({ error: 'Usuário e/ou senha incorreto(s)' })

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid)
      return reply
        .status(400)
        .send({ error: 'Usuário e/ou senha incorreto(s)' })

    // Gera o token JWT
    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    )

    // Envia o token para o cookie com a flag httpOnly
    // reply.setCookie('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'strict',
    //   path: '/',
    //   maxAge: 86400, // Expira após 1 dia
    // })

    return reply.status(200).send({ token })
  })

  // Rota de logout
  app.post('/logout', async (request, reply) => {
    // Remove o token do cookie
    // reply.clearCookie('token', {
    //   path: '/', // Garante que o cookie de qualquer parte da aplicação será removido
    // })

    return reply.send({ message: 'Logout bem-sucedido!' })
  })
}
