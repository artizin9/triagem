import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "../config/env"; // Onde a chave secreta do JWT está armazenada

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Lê o token do cookie
    const token = request.cookies.token;

    if (!token) {
      return reply.status(401).send({ message: "Token não fornecido" });
    }

    // Decodifica o token
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
    request.user = decoded; // Salva os dados do usuário no request
  } catch (error) {
    return reply.status(401).send({ message: "Token inválido ou expirado" });
  }
}
