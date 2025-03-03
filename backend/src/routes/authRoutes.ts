import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { RegisterUserInput, LoginUserInput, User } from "../models/usersModel";

const prisma = new PrismaClient();

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    const { name, email, password } = request.body as RegisterUserInput;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return reply.status(201).send({ id: user.id, name: user.name, email: user.email, role: user.role });
  });

  app.post("/login", async (request, reply) => {
    const { email, password } = request.body as LoginUserInput;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return reply.status(400).send({ error: "Usuário não encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return reply.status(400).send({ error: "Senha incorreta" });

    // Gera o token JWT
    const token = app.jwt.sign({ id: user.id, role: user.role });

    // Envia o token para o cookie com a flag httpOnly
    reply.setCookie("token", token, {
      httpOnly: true,  // Protege o cookie contra acessos via JavaScript
      secure: process.env.NODE_ENV === "production",  // Somente HTTPS em produção
      path: "/",  // Disponível para todo o site
      maxAge: 3600,  // O cookie vai expirar em uma hora (ajuste conforme necessário)
    });

    return reply.send({ message: "Login bem-sucedido!" });
  });
}
