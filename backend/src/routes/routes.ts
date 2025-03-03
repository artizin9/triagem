import { FastifyInstance } from "fastify";
import { authRoutes } from "./authRoutes";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(authRoutes); 
}
