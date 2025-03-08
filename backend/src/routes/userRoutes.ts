import { FastifyInstance, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { authenticate } from "../middlewares/authMiddleware";

const prisma = new PrismaClient();


export async function userRoutes(app: FastifyInstance) {

  // Rota para buscar todos os usuários
  app.get("/users", async (request, reply) => {
    try {
      const querySchema = z.object({
        name: z.string().min(1).max(50).optional(),
        email: z.string().email().optional(),
        page: z.string().optional(),
        limit: z.string().optional(),
      });

      const parsedQuery = querySchema.safeParse(request.query);
      if (!parsedQuery.success) {
        return reply.code(400).send({ message: "Parâmetros inválidos!" });
      }

      const { name, email, page, limit } = parsedQuery.data;

      const pageNumber = Number(page) || 1;
      const pageSize = Math.min(Number(limit) || 10, 50);

      const filters: any = {};
      if (name) filters.name = { contains: name };
      if (email) filters.email = { contains: email };

      const users = await prisma.user.findMany({
        where: filters,
        select: {
          id: true,
          name: true,
          email: true,
          telefone: true,
          cidade: true,
          estado: true,
          role: true,
          photo: true,
        },
        take: pageSize,
        skip: (pageNumber - 1) * pageSize,
      });

      if (users.length === 0) {
        return reply.code(404).send({ message: "Nenhum usuário encontrado" });
      }

      return reply.code(200).send(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return reply.status(500).send({ message: "Erro ao buscar usuários" });
    }
  });

  
  app.delete("/users/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
  
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });
  
      if (!existingUser) {
        return reply.code(404).send({ message: "Usuário não encontrado" });
      }
  
      await prisma.user.delete({
        where: { id },
      });
  
      return reply.code(200).send({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      return reply.status(500).send({ message: "Erro ao excluir usuário" });
    }
  });
  
  // Rota para obter os dados do usuário autenticado
  app.get("/me", { preHandler: authenticate }, async (request: any, reply) => {
    try {
      const userId = request.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true },
      });

      if (!user) {
        return reply.status(404).send({ message: "Usuário não encontrado" });
      }

      return reply.code(200).send(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return reply.status(500).send({ message: "Erro ao buscar usuário" });
    }
  });
}
