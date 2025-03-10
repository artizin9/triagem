import fastifyCors from '@fastify/cors' // Importa o plugin CORS
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'

import Fastify from 'fastify'
import { uploadFolder } from './config/multer'
import { env } from './env'
import { alunoRoutes } from './routes/alunoRoutes'
import { authRoutes } from './routes/authRoutes'
import { exerciciosRoutes } from './routes/exerciciosRoutes'
import { treinoAlunosRoutes } from './routes/treinoAlunosRoutes'
import { treinosRoutes } from './routes/treinosRoutes'
import { userRoutes } from './routes/userRoutes'

const app = Fastify()

// Registro do CORS com configuração personalizada
app.register(fastifyCors, {
  origin: '*', // Altere para a URL do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true, // Permite cookies
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyMultipart)
app.register(fastifyStatic, {
  root: uploadFolder,
  prefix: '/uploads', // This allows accessing images via /uploads/<filename>
})

// Registra todas as rotas do `routes.ts`
app.register(authRoutes)
app.register(userRoutes)
app.register(alunoRoutes)
app.register(treinosRoutes)
app.register(exerciciosRoutes)
app.register(treinoAlunosRoutes)

app.get('/', async () => {
  return { message: 'API funcionando! 🚀' }
})

app.listen({ port: 3333 }, () => {
  console.log('Servidor rodando em http://localhost:3333')
})

// TODO: Formatar errors de validação no zod
