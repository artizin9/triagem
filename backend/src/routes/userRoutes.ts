import { FastifyInstance, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { authenticate } from "../middlewares/authMiddleware";
import bcrypt from "bcrypt";
import { upload } from "../middlewares/uploadMiddleware"; // Importando o middleware de upload
import { uploadPhoto } from '../utils/photoURL';

const prisma = new PrismaClient();

// Remova a importação do RequestWithFile do fastify, pois você já a definiu
// interface RequestWithFile extends FastifyRequest {
//   file?: Express.Multer.File;
// }



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
          photo: true, // Adicionando a foto na resposta
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

  // Rota para criar um usuário
  app.post("/users", { preHandler: upload.single("photo") }, async (request, reply) => {
    try {
      const bodySchema = z.object({
        name: z.string().min(1).max(50),
        email: z.string().email(),
        password: z.string().min(6),
        telefone: z.string().optional(),
        cidade: z.string().optional(),
        estado: z.string().optional(),
        role: z.enum(["PERSONAL", "CLIENTE"]).optional(),
      });
  
      const parsedBody = bodySchema.safeParse(request.body);
      if (!parsedBody.success) {
        return reply.code(400).send({ message: "Dados inválidos!", errors: parsedBody.error.errors });
      }
  
      const { name, email, password, telefone = "", cidade = "", estado = "", role = "CLIENTE" } = parsedBody.data;
  
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return reply.code(409).send({ message: "O e-mail informado já está em uso." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Verificando se foi enviado um arquivo de foto
      let photoUrl: string | null = null;
  
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          telefone,
          cidade,
          estado,
          role,
          photo: photoUrl, // Salvando a URL da foto no banco de dados
        },
      });
  
      return reply.code(201).send(newUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return reply.status(500).send({ message: "Erro ao criar usuário" });
    }
  });
  
  // Rota para atualizar um usuário
  app.put("/users/:id", { preHandler: upload.single("photo") }, async (request, reply) => {
    try {
      const bodySchema = z.object({
        name: z.string().min(1).max(50).optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
        telefone: z.string().optional(),
        cidade: z.string().optional(),
        estado: z.string().optional(),
        role: z.enum(["PERSONAL", "CLIENTE"]).optional(),
      });

      const parsedBody = bodySchema.safeParse(request.body);
      if (!parsedBody.success) {
        return reply.code(400).send({ message: "Dados inválidos!", errors: parsedBody.error.errors });
      }

      const { name, email, password, telefone, cidade, estado, role } = parsedBody.data;
      const { id } = request.params as { id: string };

      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      let updatedPhotoUrl = existingUser?.photo;

      if (!existingUser) {
        return reply.code(404).send({ message: "Usuário não encontrado" });
      }

      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

      if (request.isMultipart()) {
        try {
            const fileInfo = await uploadPhoto(request, 'usuarios');
            updatedPhotoUrl = `/uploads/usuarios/${fileInfo.filename}`;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro no upload:', error.message);
                return reply.status(400).send({ error: error.message });
            } else {
                console.error('Erro desconhecido:', error);
                return reply.status(400).send({ error: 'Erro ao processar o upload' });
            }
        }
    }

      // Verificando se foi enviado um novo arquivo de foto
      let photoUrl: string | null = null;
      if (request.file) {
        const file = await request.file();
        if (file) {
          photoUrl = `/uploads/${file.filename}`; // Atualizando com a nova foto, caso tenha sido enviada
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password: hashedPassword || existingUser.password,
          telefone,
          cidade,
          estado,
          role,
          photo: photoUrl || existingUser.photo, // Atualizando a foto, se fornecida
        },
      });

      return reply.code(200).send(updatedUser);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return reply.status(500).send({ message: "Erro ao atualizar usuário" });
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
