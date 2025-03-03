import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { registerRoutes } from "./routes/routes"; // Função para registrar as rotas
import fastifyCors from "@fastify/cors"; // Importa o plugin CORS
import fastifyCookie from 'fastify-cookie';





dotenv.config();

const app = Fastify();
const prisma = new PrismaClient();

// Registro do CORS com configuração personalizada (se necessário)
app.register(fastifyCors, {
  origin: "*", // Permite todas as origens. Alterar conforme necessário
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  credentials: true, // Se for necessário enviar cookies ou outras credenciais
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "fallback_secret",
});

app.register(fastifyCookie);

// Registra todas as rotas do `routes.ts`
registerRoutes(app);


app.get("/", async () => {
  return { message: "API funcionando! 🚀" };
});

app.listen({ port: 3333 }, () => {
  console.log("Servidor rodando em http://localhost:3333");
});
