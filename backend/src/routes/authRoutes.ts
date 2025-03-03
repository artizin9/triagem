import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { RegisterUserInput, LoginUserInput, User } from "../models/usersModel";

const prisma = new PrismaClient();

export async function authRoutes(app: FastifyInstance) {
  // Rota de registro
  app.post("/register", async (request, reply) => {
    const { name, email, password } = request.body as RegisterUserInput;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return reply.status(201).send({ id: user.id, name: user.name, email: user.email, role: user.role });
  });

  // Rota de login
  app.post("/login", async (request, reply) => {
    const { email, password } = request.body as LoginUserInput;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return reply.status(400).send({ error: "Usuário não encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return reply.status(400).send({ error: "Senha incorreta" });

    // Gera o token JWT
    const token = app.jwt.sign({ id: user.id, role: user.role });

    // Envia o token para o cookie com a flag httpOnly
    reply.setCookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400, // Expira após 1 dia
    });

    return reply.send({ message: "Login bem-sucedido!" });
  });

  // Rota de logout
  app.post("/logout", async (request, reply) => {
    // Remove o token do cookie
    reply.clearCookie('token', {
      path: '/', // Garante que o cookie de qualquer parte da aplicação será removido
    });

    return reply.send({ message: "Logout bem-sucedido!" });
  });
}
